import { combineReducers } from 'redux';
import getCountriesReducer from './apiReducers';
import getFieldsReducer from './apiReducers';

export default combineReducers({
  getCountries: getCountriesReducer,
  fields: getFieldsReducer,
});
