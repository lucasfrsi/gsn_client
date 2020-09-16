import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import searchSaga from './searchSaga';
import postsSaga from './postsSaga';
import usersSaga from './usersSaga';

export default function* rootSaga() {
  yield all([
    ...authSaga,
    ...searchSaga,
    ...postsSaga,
    ...usersSaga,
  ]);
}
