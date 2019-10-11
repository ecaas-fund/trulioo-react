import reducer from '../../reducers/apiReducers';
import { GET_FIELDS } from '../../actions/types';

describe('reducer functions correctly', () => {
  it('right payload is returned when GET_FIELDS is fired', async () => {
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
