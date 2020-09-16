import { takeEvery, takeLatest, call, put, fork } from 'redux-saga/effects';

import {
  GET_POST_REQUEST,
  GET_POSTS_REQUEST,
} from '../actions/types';

import {
  getPostSuccess,
  getPostError,
  getPostsSuccess,
  getPostsError,
} from '../actions/posts';

import {
  getPostByIdService,
  getPosts,
} from '../../services/api';

// GET POST BY ID
function* getPost(action) {
  const { postId } = action.payload;
  try {
    const response = yield call(getPostByIdService, {
      postId,
    });
    yield put(getPostSuccess(response.data));
  } catch (error) {
    yield put(getPostError());
  }
}

function* watchGetPost() {
  yield takeEvery(GET_POST_REQUEST, getPost);
}

// WATCHERS EXPORT
const postsSaga = [
  fork(watchGetPost),
];

export default postsSaga;
