import { all } from 'redux-saga/effects';
import { watchFetchCategorias } from './categoria';

export default function* rootSaga() {
  return yield all([
    watchFetchCategorias()
  ])
}
