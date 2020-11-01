import { take, takeEvery, call, put, fork } from 'redux-saga/effects';

import {
  GET_USER_REQUEST,
  GET_RANDOM_USER_REQUEST,
  CHANGE_USER_AVATAR_REQUEST,
  CHANGE_USER_COVER_REQUEST,
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
  changeAvatarService,
  changeCoverService,
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

// CHANGE USER AVATAR
function* changeAvatar(action) {
  const { formData } = action.payload;
  try {
    const response = yield call(changeAvatarService, {
      formData,
    });
    // yield put(getUserSuccess(response.data));
  } catch (error) {
    // yield put(getUserError());
  }
}

function* watchChangeAvatar() {
  while (true) {
    const action = yield take(CHANGE_USER_AVATAR_REQUEST);
    yield call(changeAvatar, action);
  }
}

// CHANGE USER COVER
function* changeCover(action) {
  const { formData } = action.payload;
  try {
    const response = yield call(changeCoverService, {
      formData,
    });
    // yield put(getUserSuccess(response.data));
  } catch (error) {
    // yield put(getUserError());
  }
}

function* watchChangeCover() {
  while (true) {
    const action = yield take(CHANGE_USER_COVER_REQUEST);
    yield call(changeCover, action);
  }
}

// WATCHERS EXPORT
const usersSaga = [
  fork(watchGetUser),
  fork(watchGetRandomUser),
  fork(watchChangeAvatar),
  fork(watchChangeCover),
];

export default usersSaga;
