import { all } from 'redux-saga/effects';
import  { 
  watchDeleteMarca, 
  watchMarca, 
  watchListMarcas, 
  watchEditMarca, 
  watchInsertMarca } from './marca';

export default function* rootSaga() {
  return yield all([
    watchListMarcas(),
    watchDeleteMarca(),
    watchMarca(),
    watchInsertMarca(),
    watchEditMarca()
  ])
}
