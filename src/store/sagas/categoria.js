import { takeLatest, put } from 'redux-saga/effects'
import { Types as types, Creators as actions } from '../actions/categoria';
import { CategoriaService as service }  from './../../servers/categoria'

function* buscaCategoriasSaga() {
  yield put(actions.buscaCategoriasStart())
  try {    
    const response = yield service.getCategoriasAsync();
    const categorias = [];
    for (let key in response.data) {
      categorias.push({
        ...response.data[key],
        id: key
      });
    }
    yield put(actions.buscaCategoriasSucess(categorias))
  } catch (error) {
    yield put(actions.buscaCategoriasError())
    console.error(error) // eslint-disable-line
  }
}

export function* watchCategorias() {
  yield takeLatest(types.BUSCA_LIST_CATEGORIA, buscaCategoriasSaga)
}
