import { all } from 'redux-saga/effects';

import { watchMarca } from './marca'
import { watchAuth } from './auth'
import { watchInsumo } from './insumo'
import { watchFornecedor } from './fornecedor'
import { watchPedido } from './pedido'
import { watchManutencao } from './manutencao'
import { watchBarragem } from './barragem'

export default function* rootSaga() {
  return yield all([
    watchMarca(),
    watchAuth(),
    watchInsumo(),
    watchFornecedor(),
    watchPedido(),
    watchManutencao(),
    watchBarragem(),
  ])
}
