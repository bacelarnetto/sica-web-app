import { all } from 'redux-saga/effects';
import { watchCategorias } from './categoria';

export default function* rootSaga() {
  return yield all([
    watchCategorias()
  ])
}
