import { takeLatest, put } from 'redux-saga/effects'
import { Types as types, Creators as actions } from '../actions/marca';
import { MarcaService as service }  from './../../servers/marca'
import { toastr } from 'react-redux-toastr'

function* buscaMarcasSaga(action) {
  yield put(actions.buscaMarcasStart())
  try {    
    const response = yield service.findListPagination(action.query);
    const marcas = response.data.content;
    const totalPages = response.data.totalPages;
    const itemsCountPerPage = response.data.size;
    const totalElements = response.data.totalElements;
    yield put(actions.buscaMarcasSucess(marcas, totalPages, itemsCountPerPage, totalElements ))
    toastr.success('Sucesso', 'Operação Realizada com sucesso.')  
  } catch (error) {
    yield put(actions.buscaMarcasError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* deleteMarcaSaga(action) {
  console.log('aqui')
  yield put(actions.deleteMarcasStart())
  console.log('aqui2' + action.itemSelected)
  try {    
    yield service.submitMarca(action.itemSelected,'delete');  
    yield put(actions.deleteMarcasSucess())
    toastr.success('Sucesso', 'Exclusão Realizada com sucesso.')  
  } catch (error) {
    yield put(actions.deleteMarcasError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

export function* watchListMarcas() {
  yield takeLatest(types.BUSCA_LIST_MARCA, buscaMarcasSaga)  
}

export function* watchDeleteMarcas() {
  yield takeLatest(types.DELETE_MARCA, deleteMarcaSaga)
}
