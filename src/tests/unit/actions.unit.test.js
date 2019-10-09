import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getFields, submitForm, getSubmitBody,
} from '../../actions/index';
import { GET_FIELDS } from '../../actions/types';
import { mockApiWithDetailedConstents, mockApiWithoutConsents } from './mockApi';
import formSubmitDocV from './mock_payloads/formSubmitDocV';
import formSubmitPayloadWithConsents from './mock_payloads/formSubmitWithConsents';
import verifyResponseWithConsents from './mock_payloads/verifyResponseWithConsents';
import customFields from './mock_payloads/customFields';

// mocking proxy server responses
jest.mock('axios');

const countryCode = 'US';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeAll(() => mockApiWithoutConsents());

  it('getFields makes getFields request and dispatches correct action', () => {
    const expectedActions = [{ type: GET_FIELDS }];
    const store = mockStore({});

    return store.dispatch(getFields(countryCode)).then(() => {
      const receivedActions = store.getActions();
      expect(expectedActions.length).toEqual(receivedActions.length);
      expect(expectedActions[0].type).toEqual(receivedActions[0].type);
      expect(receivedActions[0].payload.fields).toBeDefined();
    });
  });

  it('customFields are passed properly', () => {
    const store = mockStore({});
    const expectedActions = [{ type: GET_FIELDS }];
    return store.dispatch(getFields(countryCode, customFields)).then(() => {
      const receivedActions = store.getActions();
      expect(expectedActions.length).toEqual(receivedActions.length);
    });
  });

  it('customFields cannot contain Trulioo reserved Fields', () => {
    const store = mockStore({});
    const customFieldsWithReservedKey = {
      ...customFields,
      countries: [countryCode],
    };
    return store.dispatch(getFields(countryCode, customFieldsWithReservedKey))
      .then(() => { }, (error) => {
        expect(error.message).toEqual('countries is a reserved field key. Please use another key for your custom field.');
      });
  });

  it('submit form action makes verify request and correctly parses results', () => {
    const expectedActions = [];
    const store = mockStore({});

    return store.dispatch(submitForm(formSubmitPayloadWithConsents)).then((result) => {
      const receivedActions = store.getActions();
      expect(expectedActions.length).toEqual(receivedActions.length);
      const expectedResult = {
        ...verifyResponseWithConsents,
        body: getSubmitBody(formSubmitPayloadWithConsents),
      };
      expect(result).toEqual(expectedResult);
    });
  });

  it('getFields works correctly with a DocV payload', () => {
    const expectedActions = [];
    const store = mockStore({});

    return store.dispatch(submitForm(formSubmitDocV)).then(() => {
      const receivedActions = store.getActions();
      expect(expectedActions.length).toEqual(receivedActions.length);
    });
  });
});

describe('Testing actions without detailed consents', () => {
  beforeAll(() => mockApiWithDetailedConstents());

  it('getFields makes getFields request and dispatches correct action', () => {
    const expectedActions = [];
    const store = mockStore({});

    return store.dispatch(submitForm(formSubmitPayloadWithConsents)).then((result) => {
      const receivedActions = store.getActions();
      expect(expectedActions.length).toEqual(receivedActions.length);
      const expectedResult = {
        ...verifyResponseWithConsents,
        body: getSubmitBody(formSubmitPayloadWithConsents),
      };
      expect(result).toEqual(expectedResult);
    });
  });

  it('customFields are passed properly', () => {
    const store = mockStore({});
    const expectedActions = [{ type: GET_FIELDS }];
    return store.dispatch(getFields(countryCode, customFields)).then(() => {
      const receivedActions = store.getActions();
      expect(expectedActions.length).toEqual(receivedActions.length);
    });
  });
});
