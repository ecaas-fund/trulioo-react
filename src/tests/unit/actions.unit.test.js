import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getFields } from '../../actions/index';
import { GET_FIELDS } from '../../actions/types';
import mockApi from './mockApi';

// mocking proxy server responses
jest.mock('axios');
mockApi();

const country = 'US';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  it('getFields makes getFields request and dispatches correct action', () => {
    const expectedActions = [{ type: GET_FIELDS }];
    const store = mockStore({});
    return store.dispatch(getFields(country)).then(() => {
      const receivedActions = store.getActions();
      expect(expectedActions.length).toEqual(receivedActions.length);
      expect(expectedActions[0].type).toEqual(receivedActions[0].type);
      expect(receivedActions[0].payload.fields).toBeDefined();
    });
  });
});
