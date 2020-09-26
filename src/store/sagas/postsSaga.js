import { takeEvery, takeLatest, call, put, fork } from 'redux-saga/effects';

import {
  GET_POST_REQUEST,
  GET_POSTS_REQUEST,
  LIKE_POST_REQUEST,
} from '../actions/types';

import {
  getPostSuccess,
  getPostError,
  getPostsSuccess,
  getPostsError,
  likePostSuccess,
  likePostError,
} from '../actions/posts';

import {
  getPostByIdService,
  getPosts,
  likePostService,
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

// LIKE POST
function* likePost(action) {
  const { postId, likeType } = action.payload;
  try {
    const response = yield call(likePostService, {
      postId,
      likeType,
    });
    console.log(response.data); // STOPPED HERE
    yield put(likePostSuccess(response.data));
  } catch (error) {
    yield put(likePostError());
  }
}

function* watchLikePost() {
  yield takeEvery(LIKE_POST_REQUEST, likePost);
}

// WATCHERS EXPORT
const postsSaga = [
  fork(watchGetPost),
  fork(watchLikePost),
];

export default postsSaga;
