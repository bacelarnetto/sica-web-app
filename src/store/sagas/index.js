import { all } from 'redux-saga/effects';

import  { watchMarca } from './marca';
import { watchAuth } from './auth';

export default function* rootSaga() {
  return yield all([
    watchMarca(),
    watchAuth()
  ])
}
