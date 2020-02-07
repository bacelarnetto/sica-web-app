import { all } from 'redux-saga/effects';

import  { watchMarca } from './marca';
import { watchAuth } from './auth';
import { watchInsumo } from './insumo';
import { watchFornecedor } from './fornecedor';

export default function* rootSaga() {
  return yield all([
    watchMarca(),
    watchAuth(),
    watchInsumo(),
    watchFornecedor(),
  ])
}
