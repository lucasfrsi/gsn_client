import { takeEvery, takeLatest, call, put, fork } from 'redux-saga/effects';

import {
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  LOADUSER_REQUEST,
} from '../actions/types';

import {
  loginSuccess,
  loginError,
  signupSuccess,
  signupError,
  loadUserRequest,
  loadUserSuccess,
  loadUserError,
} from '../actions/auth';

import { setAlert } from '../actions/alert';

import {
  loginService,
  signupService,
  loadUserService,
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
    yield put(loadUserRequest());
  } catch (error) {
    yield put(setAlert(error.response.data));
    yield put(loginError());
  }
}

function* watchLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, login); // change logic => while(true), not allowing to take multiple requests, and also implement cancellation logic.
}

// SIGNUP
function* signup(action) {
  const { nickname, email, password } = action.payload;
  try {
    const response = yield call(signupService, {
      nickname,
      email,
      password,
    });
    yield put(signupSuccess(response.data));
    yield put(loadUserRequest());
  } catch (error) {
    yield put(setAlert(error.response.data));
    yield put(signupError());
  }
}

function* watchSignupRequest() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

// LOAD USER
function* loadUser() {
  try {
    const response = yield call(loadUserService);
    yield put(loadUserSuccess(response.data));
  } catch (error) {
    yield put(loadUserError());
  }
}

function* watchLoadUserRequest() {
  yield takeEvery(LOADUSER_REQUEST, loadUser);
}

// WATCHERS EXPORT
const authSaga = [
  fork(watchLoginRequest),
  fork(watchSignupRequest),
  fork(watchLoadUserRequest),
];

export default authSaga;
