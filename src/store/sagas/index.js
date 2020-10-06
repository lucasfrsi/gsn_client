import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import searchSaga from './searchSaga';
import postsSaga from './postsSaga';
import usersSaga from './usersSaga';
import momentsSaga from './momentsSaga';

export default function* rootSaga() {
  yield all([
    ...authSaga,
    ...searchSaga,
    ...postsSaga,
    ...usersSaga,
    ...momentsSaga,
  ]);
}
