import { combineReducers } from 'redux';

import alertReducer from './alertReducer';
import authReducer from './authReducer';
import searchReducer from './searchReducer';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';
import momentsReducer from './momentsReducer';

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  search: searchReducer,
  posts: postsReducer,
  moments: momentsReducer,
  users: usersReducer,
});

export default rootReducer;
