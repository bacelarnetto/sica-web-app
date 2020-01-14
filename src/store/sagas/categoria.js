import { takeLatest, put } from 'redux-saga/effects'
import { Types as types, Creators as actions } from '../actions/categoria';
import { CategoriaService as service }  from './../../servers/categoria'

function* buscaCategoriasSaga(action) {
  yield put(actions.buscaCategoriasStart())
  try {    
    const response = yield service.findListPagination(action.query);

    const categorias = response.data.content;
    const totalPages = response.data.totalPages;
    const itemsCountPerPage = response.data.size;
    const totalElements = response.data.totalElements;

    yield put(actions.buscaCategoriasSucess(categorias, totalPages, itemsCountPerPage, totalElements ))
  } catch (error) {
    yield put(actions.buscaCategoriasError())
    console.error(error) // eslint-disable-line
  }
}

export function* watchCategorias() {
  yield takeLatest(types.BUSCA_LIST_CATEGORIA, buscaCategoriasSaga)
}
