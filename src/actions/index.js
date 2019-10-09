import axios from 'axios';
import 'core-js';
import * as R from 'ramda';
import { GET_COUNTRIES, GET_FIELDS } from './types';

// this is instantiated through BASE_URL
let BASE_URL;
const reservedFormDataKeys = ['countries', 'TruliooFields', 'Consents'];

export const getCountries = (url) => async (dispatch) => {
  BASE_URL = url;

  const URL = `${BASE_URL}/api/getcountrycodes`;
  const promise = await axios.get(URL);

  dispatch({
    type: GET_COUNTRIES,
    payload: promise.data.response.sort(),
  });
};

const parseFields = (obj) => {
  for (const [key, _] of Object.entries(obj)) {
    if (key == 0) {
      return;
    }
    if (key === 'label') {
      obj.title = obj[key];
    }
    parseFields(obj[key]);
  }
  return obj;
};

const requestFields = async (countryCode) => {
  const URL = `${BASE_URL}/api/getrecommendedfields/${countryCode}`;
  const response = await axios.get(URL);
  const parsedFields = parseFields(response.data.response);
  return parsedFields;
};

const updateStateProvince = (obj, subdivisions) => {
  Object.keys(obj).forEach((k) => {
    if (k === 'StateProvinceCode' && subdivisions.length > 0) {
      obj[k] = {
        ...obj[k],
        enum: subdivisions.map((x) => x.Code),
        enumNames: subdivisions.map((x) => x.Name),
      };
    } else if (obj[k] !== null && typeof obj[k] === 'object') {
      updateStateProvince(obj[k], subdivisions);
    }
  });
};

const requestSubdivisions = async (countryCode) => {
  const URL = `${BASE_URL}/api/getcountrysubdivisions/${countryCode}`;
  const response = await axios.get(URL);
  const subdivisions = response.data.response;

  // sorting subdivisions by 'Name'
  return R.sortBy(
    R.compose(
      R.toLower,
      R.prop('Name'),
    ),
  )(subdivisions);
};

async function requestConsents(countryCode) {
  const URL = `${BASE_URL}/api/getdetailedconsents/${countryCode}`;
  const response = await axios.get(URL);
  const consents = response.data.response;
  return consents;
}

const generateConsentSchema = (consents) => {
  if (consents === undefined || consents.length <= 0 || consents.length === undefined) {
    return;
  }
  const schema = {
    title: 'Consents',
    type: 'object',
    required: [],
    properties: {},
  };
  consents.forEach((x) => {
    schema.required.push(x.Name);
    schema.properties[x.Name] = {
      title: x.Text,
      type: 'boolean',
      default: false,
    };
  });
  return schema;
};

const validateCustomFields = (customFields) => {
  if (customFields) {
    Object.keys(customFields).forEach((key) => {
      if (reservedFormDataKeys.includes(key)) {
        throw Error(
          `${key} is a reserved field key. Please use another key for your custom field.`,
        );
      }
    });
  }
};

const parseTruliooFields = (formData) => {
  const truliooFields = {};
  Object.keys(formData).forEach((key) => {
    if (reservedFormDataKeys.includes(key)) {
      truliooFields[key] = formData[key];
    }
  });
  return truliooFields;
};

export const getFields = (countryCode, customFields) => async (dispatch) => {
  if (countryCode === '' || !countryCode) {
    return;
  }
  validateCustomFields(customFields);
  const fields = await requestFields(countryCode);
  const subdivisions = await requestSubdivisions(countryCode);
  let consents = await requestConsents(countryCode);
  consents = generateConsentSchema(consents);
  if (fields && fields.properties) {
    updateStateProvince(fields.properties, subdivisions);
  }
  dispatch({
    type: GET_FIELDS,
    payload: {
      fields,
      consents,
      customFields,
      formData: {
        countries: countryCode,
      },
    },
  });
};

const getCountryCode = (form) => {
  for (const [key, value] of Object.entries(form)) {
    if (key === 'countries') {
      return value;
    }
  }
};

const parseFormData = (form) => {
  if (form.TruliooFields.Document) {
    const docFront = form.TruliooFields.Document.DocumentFrontImage;
    form.TruliooFields.Document.DocumentFrontImage = docFront.substr(
      docFront.indexOf(',') + 1,
    );
    const docBack = form.TruliooFields.Document.DocumentBackImage;
    if (docBack) {
      form.TruliooFields.Document.DocumentBackImage = docBack.substr(
        docBack.indexOf(',') + 1,
      );
    }
    const livePhoto = form.TruliooFields.Document.LivePhoto;
    if (livePhoto) {
      form.TruliooFields.Document.LivePhoto = livePhoto.substr(
        livePhoto.indexOf(',') + 1,
      );
    }
  }
  if (form.TruliooFields.NationalIds) {
    form.TruliooFields.NationalIds = [form.TruliooFields.NationalIds];
  }
  return form;
};

const parseConsents = (consents) => {
  const result = [];
  if (consents === undefined) {
    return result;
  }
  Object.keys(consents).forEach((x) => {
    if (consents[x]) {
      result.push(x);
    }
  });
  return result;
};

export const getSubmitBody = (form) => {
  const countryCode = getCountryCode(form);
  form = parseFormData(form);

  return {
    AcceptTruliooTermsAndConditions: true,
    CleansedAddress: true,
    ConfigurationName: 'Identity Verification',
    CountryCode: countryCode,
    DataFields: form.TruliooFields,
    ConsentForDataSources: parseConsents(form.Consents),
  };
};

export const submitForm = (form) => async () => {
  // deep copying form
  const formClone = JSON.parse(JSON.stringify(form));
  const truliooFormData = parseTruliooFields(formClone);

  const body = getSubmitBody(truliooFormData);
  const URL = `${BASE_URL}/api/verify`;
  const promiseResult = await axios.post(URL, body).then((response) => ({
    ...response,
    body,
  }));
  return promiseResult;
};
