import { takeEvery, call, put, fork } from 'redux-saga/effects';

import {
  GET_USER_REQUEST,
  GET_RANDOM_USER_REQUEST,
} from '../actions/types';

import {
  getUserSuccess,
  getUserError,
  getRandomUserSuccess,
  getRandomUserError,
} from '../actions/users';

import {
  getUserService,
  getRandomUserService,
} from '../../services/api';

// GET USER BY ID
function* getUser(action) {
  const { userId } = action.payload;
  try {
    const response = yield call(getUserService, {
      userId,
    });
    yield put(getUserSuccess(response.data));
  } catch (error) {
    yield put(getUserError());
  }
}

function* watchGetUser() {
  yield takeEvery(GET_USER_REQUEST, getUser);
}

// GET RANDOM USER
function* getRandomUser() {
  try {
    const response = yield call(getRandomUserService);
    yield put(getRandomUserSuccess(response.data.randomUser));
  } catch (error) {
    yield put(getRandomUserError());
  }
}

function* watchGetRandomUser() {
  yield takeEvery(GET_RANDOM_USER_REQUEST, getRandomUser);
}

// WATCHERS EXPORT
const usersSaga = [
  fork(watchGetUser),
  fork(watchGetRandomUser),
];

export default usersSaga;
