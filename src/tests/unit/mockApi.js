import axios from 'axios';
import getCountryCodes from './mock_payloads/getCountryCodes';
import getRecommendedFields from './mock_payloads/getRecommendedFields';
import getCountrySubdivisions from './mock_payloads/getCountrySubdivisions';
import getDetailedConsents from './mock_payloads/getDetailedConsents';
import verifyResponse from './mock_payloads/verifyResponse';

const response = (data) => ({ status: 200, data: { response: data } });

const mockApi = () => {
  axios.get.mockImplementation((url) => {
    if (url.includes('getcountrycodes')) {
      return Promise.resolve(response(getCountryCodes));
    }
    if (url.includes('getrecommendedfields')) {
      return Promise.resolve(response(getRecommendedFields));
    }
    if (url.includes('getcountrysubdivisions')) {
      return Promise.resolve(response(getCountrySubdivisions));
    }
    if (url.includes('getdetailedconsents')) {
      return Promise.resolve(response(getDetailedConsents));
    }
    /* istanbul ignore next */
    return Promise.reject();
  });
  axios.post.mockImplementation((url) => {
    if (url.includes('verify')) {
      return Promise.resolve(verifyResponse);
    }
    /* istanbul ignore next */
    return Promise.reject();
  });
};

export default mockApi;
