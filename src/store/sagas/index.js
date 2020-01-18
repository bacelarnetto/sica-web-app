import { all } from 'redux-saga/effects';
import  { watchDeleteMarca, watchMarca, watchListMarcas } from './marca';

export default function* rootSaga() {
  return yield all([
    watchListMarcas(),
    watchDeleteMarca(),
    watchMarca(),
  ])
}
