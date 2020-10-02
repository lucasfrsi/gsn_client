import { takeEvery, take, call, put, fork } from 'redux-saga/effects';

import {
  GET_POST_REQUEST,
  GET_POSTS_REQUEST,
  LIKE_POST_REQUEST,
  DELETE_POST_REQUEST,
  CREATE_POST_REQUEST,
} from '../actions/types';

import {
  getPostSuccess,
  getPostError,
  getPostsSuccess,
  getPostsError,
  likePostSuccess,
  likePostError,
  deletePostSuccess,
  deletePostError,
  createPostSuccess,
  createPostError,
} from '../actions/posts';

import {
  getPostByIdService,
  getPosts,
  likePostService,
  deletePostService,
  createPostService,
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
    yield put(likePostSuccess(response.data.post));
  } catch (error) {
    yield put(likePostError());
  }
}

function* watchLikePost() {
  while (true) {
    const action = yield take(LIKE_POST_REQUEST);
    yield call(likePost, action);
  }
}

// DELETE POST
function* deletePost(action) {
  const { postId } = action.payload;
  try {
    yield call(deletePostService, {
      postId,
    });
    yield put(deletePostSuccess(postId));
  } catch (error) {
    yield put(deletePostError());
  }
}

function* watchDeletePost() {
  while (true) {
    const action = yield take(DELETE_POST_REQUEST);
    yield call(deletePost, action);
  }
}

// CREATE POST
function* createPost(action) {
  const { text } = action.payload;
  try {
    const response = yield call(createPostService, {
      text,
    });
    yield put(createPostSuccess(response.data.post));
  } catch (error) {
    yield put(createPostError());
  }
}

function* watchCreatePost() {
  while (true) {
    const action = yield take(CREATE_POST_REQUEST);
    yield call(createPost, action);
  }
}

// WATCHERS EXPORT
const postsSaga = [
  fork(watchGetPost),
  fork(watchLikePost),
  fork(watchDeletePost),
  fork(watchCreatePost),
];

export default postsSaga;
