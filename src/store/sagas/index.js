import { all } from 'redux-saga/effects';
import { watchCategorias } from './categoria';
import  { watchDeleteMarcas, watchListMarcas } from './marca';

export default function* rootSaga() {
  return yield all([
    watchCategorias(),
    watchListMarcas(),
    watchDeleteMarcas(),
  ])
}
