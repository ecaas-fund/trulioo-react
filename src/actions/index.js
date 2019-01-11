import axios from 'axios'
import 'core-js'
import { GET_COUNTRIES, GET_FIELDS } from './types'
import * as R from 'ramda'

let BASE_URL

export const getCountries = (url) => async dispatch => {
    BASE_URL = url

    const URL = `${BASE_URL}/api/countryCodes`
    const promise = await axios.get(URL)

    dispatch({ type: GET_COUNTRIES, payload: promise.data.response })
}

export const getFields = countryCode => async dispatch => {
    if (countryCode === '' || !countryCode) {
        return
    }
    const URL = `${BASE_URL}/api/getFields/${countryCode}`
    let promise = await axios.get(URL)
    let parsedFields = parseFields(JSON.parse(promise.data.response))
    removeAdditionalFields(parsedFields)

    dispatch({
        type: GET_FIELDS,
        payload: {
            fields: parsedFields,
            formData: {
                countries: countryCode
            }
        }
    })
}

const getCountryCode = (form) => {
    for (let [key, value] of Object.entries(form)) {
        if (key === 'countries') {
            return value
        }
    }
}

const getBody = (form) => {
    const countryCode = getCountryCode(form)
    form = parseFormData(form)
    return {
        "AcceptTruliooTermsAndConditions": true,
        "CleansedAddress": false,
        "@gdc-test": true,
        "ConfigurationName": "Identity Verification",
        "CountryCode": countryCode, "DataFields": form.Properties
    }
}

export const submitForm = (form) => async () => {
    const body = getBody(form.formData)
    const URL = `${BASE_URL}/api/verify`
    const promiseResult = await axios.post(URL, body).then(response => {
        return response
    })
    return promiseResult
}

const parseFormData = (form) => {
    if (form.Properties.Document) {
        var docFront = form.Properties.Document.DocumentFrontImage
        form.Properties.Document.DocumentFrontImage = docFront.substr(docFront.indexOf(',') + 1)
        var docBack = form.Properties.Document.DocumentBackImage
        if (docBack) {
            form.Properties.Document.DocumentBackImage = docBack.substr(docBack.indexOf(',') + 1)
        }
        var livePhoto = form.Properties.Document.LivePhoto
        if (livePhoto) {
            form.Properties.Document.LivePhoto = livePhoto.substr(livePhoto.indexOf(',') + 1)
        }
    }
    if (form.Properties.NationalIds) {
        form.Properties.NationalIds = [form.Properties.NationalIds]
    }
    return form
}

const keysThatShouldBeObjects = ['Communication', 'CountrySpecific', 'Location']
const keysThatShouldBeStrings = ['EnhancedProfile']
const keysThatShouldBeBooleans = ['AcceptIncompleteDocument']
const keysThatShouldBeFileData = ['LivePhoto', 'DocumentBackImage', 'DocumentFrontImage']

const parseFields = (obj) => {
    for (let [key, _] of Object.entries(obj)) {
        if (key == 0) {
            return
        }
        if (keysThatShouldBeObjects.includes(key)) {
            obj[key] = convertToObject(obj[key])
        }
        if (keysThatShouldBeStrings.includes(key)) {
            obj[key] = convertToString(obj[key])
        }
        if (keysThatShouldBeBooleans.includes(key)) {
            obj[key] = convertToBoolean(obj[key])
        }
        if (keysThatShouldBeFileData.includes(key)) {
            obj[key] = convertToFileData(obj[key])
        }
        if (key === 'label') {
            obj['title'] = obj[key]
        }
        let currentInnerObj = obj[key]
        if (!currentInnerObj.properties && currentInnerObj.type === 'object') {

            currentInnerObj.type = 'string'
        }
        obj[key] = convertIntToInteger(obj, key)
        parseAdditionalFields(obj, key)
        parseFields(obj[key])
    }
    return obj
}

function removeAdditionalFields(obj) {
    Object.keys(obj).forEach(function (k) {
        if (obj[k] !== null && typeof obj[k] === 'object') {
            if (obj[k].AdditionalFields) {
                obj[k] = R.omit(['AdditionalFields'], obj[k])
            }
            removeAdditionalFields(obj[k]);
            return;
        }
    });
}

const parseAdditionalFields = (obj, key) => {
    if (key === 'AdditionalFields') {
        const additionalFieldsObj = obj[key]
        const innerObj = additionalFieldsObj.properties.properties
        let childObj;
        for (let [innerKey, _] of Object.entries(innerObj)) {
            let innerObj = obj.AdditionalFields.properties.properties[innerKey]
            childObj = {
                ...childObj,
                [innerKey]: innerObj
            }
        }
        const omitObj = R.omit([key], obj)
        obj[key] = omitObj
        obj = R.omit([key], obj)
    }
    return obj
}

const convertIntToInteger = (obj, key) => {
    if (key === "type" && obj[key] === "int") {
        return "integer"
    }
    return obj[key]
}

const convertToObject = (obj) => {
    if (obj) {
        return {
            ...obj,
            type: "object"
        }
    }
    return obj
}

const convertToFileData = (obj) => {
    if (obj) {
        return {
            ...obj,
            type: "string",
            format: "data-url"
        }
    }
}

const convertToString = (obj) => {
    if (obj) {
        return {
            ...obj,
            type: 'string'
        }
    }
    return obj
}

const convertToBoolean = (obj) => {
    if (obj) {
        return {
            ...obj,
            type: 'boolean'
        }
    }
    return obj
}