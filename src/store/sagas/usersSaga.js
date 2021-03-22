import { take, takeEvery, call, put, fork } from 'redux-saga/effects';

import {
  GET_USER_REQUEST,
  GET_RANDOM_USER_REQUEST,
  CHANGE_USER_AVATAR_REQUEST,
  CHANGE_USER_COVER_REQUEST,
  UPDATE_USER_PROFILE_REQUEST,
  DELETE_USER_REQUEST,
} from '../actions/types';

import {
  getUserSuccess,
  getUserError,
  getRandomUserSuccess,
  getRandomUserError,
  changeAvatarSuccess,
  changeAvatarError,
  changeCoverSuccess,
  changeCoverError,
  updateProfileSuccess,
  updateProfileError,
  deleteUserSuccess,
  deleteUserError,
} from '../actions/users';

import {
  getUserService,
  getRandomUserService,
  changeAvatarService,
  changeCoverService,
  updateProfileService,
  deleteUserService,
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
    yield put(changeAvatarSuccess(response.data.avatar));
  } catch (error) {
    yield put(changeAvatarError());
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
    yield put(changeCoverSuccess(response.data.cover));
  } catch (error) {
    yield put(changeCoverError());
  }
}

function* watchChangeCover() {
  while (true) {
    const action = yield take(CHANGE_USER_COVER_REQUEST);
    yield call(changeCover, action);
  }
}

// UPDATE USER PROFILE
function* updateProfile(action) {
  const { updatedProfile } = action.payload;
  try {
    const response = yield call(updateProfileService, {
      updatedProfile,
    });
    yield put(updateProfileSuccess(response.data.updatedProfile));
  } catch (error) {
    yield put(updateProfileError());
  }
}

function* watchUpdateProfile() {
  while (true) {
    const action = yield take(UPDATE_USER_PROFILE_REQUEST);
    yield call(updateProfile, action);
  }
}

// DELETE USER
function* deleteUser() {
  try {
    yield call(deleteUserService);
    yield put(deleteUserSuccess());
  } catch (error) {
    yield put(deleteUserError());
  }
}

function* watchDeleteUser() {
  while (true) {
    yield take(DELETE_USER_REQUEST);
    yield call(deleteUser);
  }
}

// WATCHERS EXPORT
const usersSaga = [
  fork(watchGetUser),
  fork(watchGetRandomUser),
  fork(watchChangeAvatar),
  fork(watchChangeCover),
  fork(watchUpdateProfile),
  fork(watchDeleteUser),
];

export default usersSaga;
