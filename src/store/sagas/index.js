import { all } from 'redux-saga/effects';
import postsSagas from './posts';

export default function* rootSaga() {
  yield all([
    ...postsSagas,
  ]);
}
