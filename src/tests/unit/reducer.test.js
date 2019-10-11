import reducer from '../../reducers/apiReducers';
import { GET_FIELDS } from '../../actions/types';

describe('reducer functions correctly', () => {
  it('GET_FIELDS works', async () => {
    const action = {
      payload: {
        testGetFields: 'testGetFields',
      },
      type: GET_FIELDS,
    };

    const result = reducer(undefined, action);
    expect(action.payload).toEqual(result);
  });
});
