import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/index';
import * as types from '../../actions/types';
import mockApi from './mockApi';

// mocking proxy server responses
jest.mock('axios');
mockApi();

const country = 'US';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  it('getFields makes get requests and dispatches correct action', () => {
    const expectedActions = [{ type: types.GET_FIELDS }];
    const store = mockStore({});

    store.dispatch(actions.getFields(country)).then(() => {
      const receivedActions = store.getActions();
      expect(expectedActions.length).toEqual(receivedActions.length);
      expect(expectedActions[0].type).toEqual(receivedActions[0].type);
      expect(receivedActions[0].payload.fields).toBeDefined();
    });
  });
});
