import { takeLatest, put, call } from 'redux-saga/effects'
import { Types as CategoriaTypes, Creators as CategoriaActions } from '../actions/categoria';
import { CategoriaService as categoriaService }  from './../../servers/categoria'

function* fetchCategorias() {
  yield put(CategoriaActions.buscaCategorias())
  try {
    const categorias = yield call(categoriaService.getCategoriasAsync())
    yield put(CategoriaActions.buscaCategoriasSucess(categorias))
  } catch (error) {
    yield put(CategoriaActions.buscaCategoriasError())
    console.error(error) // eslint-disable-line
  }
}

export function* watchFetchCategorias() {
  yield takeLatest(CategoriaTypes.CATEGORIAS_FETCHED, fetchCategorias)
}
