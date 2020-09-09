import { combineReducers } from 'redux';

import alertReducer from './alertReducer';
import authReducer from './authReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  search: searchReducer,
});

export default rootReducer;
