import { takeLatest, call, put, fork, race, take } from 'redux-saga/effects';

import {
  SEARCHUSER_REQUEST,
  SEARCHUSER_CANCEL,
} from '../actions/types';

import {
  searchUserSuccess,
  searchUserError,
} from '../actions/search';

import {
  searchUserService,
} from '../../services/api';

// SEARCH USERS
function* searchUsers(action) {
  const { query } = action.payload;
  try {
    const { response } = yield race({
      response: call(searchUserService, query),
      cancel: take(SEARCHUSER_CANCEL),
    });
    yield put(searchUserSuccess(response.data));
  } catch (error) {
    yield put(searchUserError());
  }
}

function* watchSearchUsersRequest() {
  yield takeLatest(SEARCHUSER_REQUEST, searchUsers);
}

// WATCHERS EXPORT
const searchSaga = [
  fork(watchSearchUsersRequest),
];

export default searchSaga;
