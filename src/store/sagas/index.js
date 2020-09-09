import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import searchSaga from './searchSaga';

export default function* rootSaga() {
  yield all([
    ...authSaga,
    ...searchSaga,
  ]);
}
