import axios from 'axios';
import getCountryCodes from './mock_payloads/getCountryCodes';
import getRecommendedFields from './mock_payloads/getRecommendedFields';
import getCountrySubdivisions from './mock_payloads/getCountrySubdivisions';
import getDetailedConsents from './mock_payloads/getDetailedConsents';
import verifyResponse from './mock_payloads/verifyResponse';

const response = (data) => ({ status: 200, data: { response: data } });

const mockApi = (
  getCountryCodesPayload,
  getRecommendedFieldsPayload,
  getCountrySubdivisionsPayload,
  getDetailedConsentsPayload,
  verifyResponsePayload,
) => {
  axios.get.mockImplementation((url) => {
    if (url.includes('getcountrycodes')) {
      return Promise.resolve(response(getCountryCodesPayload));
    }
    if (url.includes('getrecommendedfields')) {
      return Promise.resolve(response(getRecommendedFieldsPayload));
    }
    if (url.includes('getcountrysubdivisions')) {
      return Promise.resolve(response(getCountrySubdivisionsPayload));
    }
    if (url.includes('getdetailedconsents')) {
      return Promise.resolve(response(getDetailedConsentsPayload));
    }
    /* istanbul ignore next */
    return Promise.reject();
  });
  axios.post.mockImplementation((url) => {
    if (url.includes('verify')) {
      return Promise.resolve(verifyResponsePayload);
    }
    /* istanbul ignore next */
    return Promise.reject();
  });
};

export const mockApiWithDetailedConstents = () => mockApi(
  getCountryCodes,
  getRecommendedFields,
  getCountrySubdivisions,
  getDetailedConsents,
  verifyResponse,
);

export const mockApiWithoutConsents = () => mockApi(
  getCountryCodes,
  getRecommendedFields,
  getCountrySubdivisions,
  {},
  verifyResponse,
);
