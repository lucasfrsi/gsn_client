import { takeEvery, call, put, fork } from 'redux-saga/effects';

import {
  GET_USER_REQUEST,
} from '../actions/types';

import {
  getUserSuccess,
  getUserError,
} from '../actions/users';

import {
  getUserService,
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

// WATCHERS EXPORT
const usersSaga = [
  fork(watchGetUser),
];

export default usersSaga;
