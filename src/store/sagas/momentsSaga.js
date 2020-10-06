import { takeEvery, take, call, put, fork } from 'redux-saga/effects';

import {
  GET_MOMENTS_REQUEST,
  CREATE_MOMENT_REQUEST,
  DELETE_MOMENT_REQUEST,
  REACT_MOMENT_REQUEST,
} from '../actions/types';

import {
  getMomentsSuccess,
  getMomentsError,
  createMomentSuccess,
  createMomentError,
  deleteMomentSuccess,
  deleteMomentError,
  reactMomentSuccess,
  reactMomentError,
} from '../actions/moments';

import {
  getMomentsService,
  createMomentService,
  deleteMomentService,
  reactMomentService,
} from '../../services/api';

// GET MOMENTS
function* getMoments() {
  try {
    const response = yield call(getMomentsService);
    yield put(getMomentsSuccess(response.data.moments));
  } catch (error) {
    yield put(getMomentsError());
  }
}

function* watchGetMoments() {
  yield takeEvery(GET_MOMENTS_REQUEST, getMoments);
}

// CREATE MOMENT
function* createMoment(action) {
  const { formData } = action.payload;
  try {
    const response = yield call(createMomentService, {
      formData,
    });
    yield put(createMomentSuccess(response.data.moment));
  } catch (error) {
    yield put(createMomentError());
  }
}

function* watchCreateMoment() {
  while (true) {
    const action = yield take(CREATE_MOMENT_REQUEST);
    yield call(createMoment, action);
  }
}

// DELETE MOMENT
function* deleteMoment(action) {
  const { momentId } = action.payload;
  try {
    yield call(deleteMomentService, {
      momentId,
    });
    yield put(deleteMomentSuccess(momentId));
  } catch (error) {
    yield put(deleteMomentError());
  }
}

function* watchDeleteMoment() {
  while (true) {
    const action = yield take(DELETE_MOMENT_REQUEST);
    yield call(deleteMoment, action);
  }
}

// REACT TO MOMENT
function* reactMoment(action) {
  const { momentId, reactionType } = action.payload;
  try {
    const response = yield call(reactMomentService, {
      momentId,
      reactionType,
    });
    yield put(reactMomentSuccess(response.data.moment));
  } catch (error) {
    yield put(reactMomentError());
  }
}

function* watchReactMoment() {
  while (true) {
    const action = yield take(REACT_MOMENT_REQUEST);
    yield call(reactMoment, action);
  }
}

// WATCHERS EXPORT
const momentsSaga = [
  fork(watchGetMoments),
  fork(watchCreateMoment),
  fork(watchDeleteMoment),
  fork(watchReactMoment),
];

export default momentsSaga;
