import { combineReducers } from 'redux';
import reducer from './apiReducers';

export default combineReducers({
  getCountries: reducer,
  fields: reducer,
});
