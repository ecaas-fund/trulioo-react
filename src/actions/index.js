import axios from 'axios';
import 'core-js';
import * as R from 'ramda';
import { GET_COUNTRIES, GET_FIELDS } from './types';

let BASE_URL;

export const getCountries = url => async (dispatch) => {
  BASE_URL = url;

  const URL = `${BASE_URL}/api/countryCodes`;
  const promise = await axios.get(URL);

  dispatch({
    type: GET_COUNTRIES,
    payload: JSON.parse(promise.data.response).sort(),
  });
};

const requestFields = async (countryCode) => {
  if (countryCode === '' || !countryCode) {
    return;
  }
  const URL = `${BASE_URL}/api/getFields/${countryCode}`;
  const response = await axios.get(URL);
  return JSON.parse(response.data.response);
};

const updateStateProvince = (obj, subdivisions) => {
  Object.keys(obj).forEach((k) => {
    if (k === 'StateProvinceCode' && subdivisions.length > 0) {
      obj[k] = {
        ...obj[k],
        enum: subdivisions.map(x => x.Code),
        enumNames: subdivisions.map(x => x.Name),
      };
    } else if (obj[k] !== null && typeof obj[k] === 'object') {
      updateStateProvince(obj[k], subdivisions);
    }
  });
};

const requestSubdivisions = async (countryCode) => {
  if (countryCode === '' || !countryCode) {
    return;
  }
  const URL = `${BASE_URL}/api/getCountrySubdivisions/${countryCode}`;
  const response = await axios.get(URL);
  const subdivisions = JSON.parse(response.data.response);

  // sorting subdivisions by 'Name'
  return R.sortBy(
    R.compose(
      R.toLower,
      R.prop('Name'),
    ),
  )(subdivisions);
};

export const getFields = countryCode => async (dispatch) => {
  if (countryCode === '' || !countryCode) {
    return;
  }
  const fields = await requestFields(countryCode);
  const subdivisions = await requestSubdivisions(countryCode);
  if (fields && fields.properties) {
    updateStateProvince(fields.properties, subdivisions);
  }
  dispatch({
    type: GET_FIELDS,
    payload: {
      fields,
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
  if (form.Properties.Document) {
    const docFront = form.Properties.Document.DocumentFrontImage;
    form.Properties.Document.DocumentFrontImage = docFront.substr(docFront.indexOf(',') + 1);
    const docBack = form.Properties.Document.DocumentBackImage;
    if (docBack) {
      form.Properties.Document.DocumentBackImage = docBack.substr(docBack.indexOf(',') + 1);
    }
    const livePhoto = form.Properties.Document.LivePhoto;
    if (livePhoto) {
      form.Properties.Document.LivePhoto = livePhoto.substr(livePhoto.indexOf(',') + 1);
    }
  }
  if (form.Properties.NationalIds) {
    form.Properties.NationalIds = [form.Properties.NationalIds];
  }
  return form;
};

const getBody = (form) => {
  const countryCode = getCountryCode(form);
  form = parseFormData(form);
  return {
    AcceptTruliooTermsAndConditions: true,
    CleansedAddress: true,
    ConfigurationName: 'Identity Verification',
    CountryCode: countryCode,
    DataFields: form.Properties,
  };
};

export const submitForm = form => async () => {
  const body = getBody(form.formData);
  const URL = `${BASE_URL}/api/verify`;
  const promiseResult = await axios.post(URL, body).then(response => ({
    ...response,
    body,
  }));
  return promiseResult;
};
