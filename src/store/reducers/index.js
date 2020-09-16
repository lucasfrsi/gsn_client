import { combineReducers } from 'redux';

import alertReducer from './alertReducer';
import authReducer from './authReducer';
import searchReducer from './searchReducer';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  search: searchReducer,
  posts: postsReducer,
  users: usersReducer,
});

export default rootReducer;
