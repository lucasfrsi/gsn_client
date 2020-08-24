import { combineReducers } from 'redux';

import counterReducer from './counter';
import postsReducer from './posts';

const rootReducer = combineReducers({
  counter: counterReducer,
  posts: postsReducer,
});

export default rootReducer;
