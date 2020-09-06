import { takeEvery, takeLatest, call, put, fork, take } from 'redux-saga/effects';

import {
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  LOADUSER_REQUEST,
} from '../actions/types';

import {
  loginSuccess,
  loginError,
} from '../actions/auth';

import {
  loginService,
  signupService,
} from '../../services/api';

// LOGIN
function* login(action) {
  const { email, password } = action.payload;
  try {
    const response = yield call(loginService, {
      email,
      password,
    });
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginError(error.response.data));
  }
}

function* watchLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, login);
}

// CREATE POST
// function* createPost(action) {
//   try {
//     const response = yield call(api.createPost, {
//       title: action.payload.title,
//       body: action.payload.body,
//     });
//     // eslint-disable-next-line no-console
//     console.log('[CREATE POST SAGA - API RESPONSE]', response);
//     yield call(getPosts);
//   } catch (error) {
//     yield put(postsErrorAction('An error occurred when trying to create the post.'));
//   }
// }

// function* watchCreatePostRequest() {
//   yield takeLatest(CREATE_POST_REQUEST, createPost);
// }

// DELETE POST
// function* deletePost(postId) {
//   try {
//     const response = yield call(api.deletePost, postId);
//     // eslint-disable-next-line no-console
//     console.log('[DELETE POST SAGA - API RESPONSE]', response);
//     yield call(getPosts);
//   } catch (error) {
//     yield put(postsErrorAction('An error occurred when trying to delete the post.'));
//   }
// }

// function* watchDeletePostRequest() {
//   while (true) {
//     const action = yield take(DELETE_POST_REQUEST);
//     yield call(deletePost, action.payload.postId);
//   }
// }

// WATCHERS EXPORT
const authSaga = [
  fork(watchLoginRequest),
  // fork(watchDeletePostRequest),
  // fork(watchCreatePostRequest),
];

export default authSaga;
