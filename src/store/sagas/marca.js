import { takeLatest, put } from 'redux-saga/effects'
import { Types as types, Creators as actions } from '../actions/marca';
import { MarcaService as service }  from './../../servers/marca'
import { toastr } from 'react-redux-toastr'

function* buscaListMarcasSaga(action) {
  yield put(actions.buscaListMarcasStart())
  try {    
    const response = yield service.findListPagination(action.query);
    const marcas = response.data.content;
    const totalPages = response.data.totalPages;
    const itemsCountPerPage = response.data.size;
    const totalElements = response.data.totalElements;
    yield put(actions.buscaListMarcasSucess(marcas, totalPages, itemsCountPerPage, totalElements )) 
  } catch (error) {
    yield put(actions.buscaListMarcasError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* buscaMarcaSaga(action) {
  yield put(actions.buscaMarcaStart())
  try {    
    const response = yield service.findMarcaById(action.itemSelected);
    const marca = response.data.content;
    yield put(actions.buscaMarcaSucess(marca)) 
  } catch (error) {
    yield put(actions.buscaMarcaError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* deleteMarcaSaga(action) {
  yield put(actions.deleteMarcasStart())
  try {    
    const responseDelete = yield service.submitMarca(action.itemSelected,'delete'); 
    if(responseDelete !== undefined && responseDelete !== null &&
    (responseDelete.status === 200 || responseDelete.status === 204)) {
      yield put(actions.deleteMarcasSucess())
      toastr.success('Sucesso:', 'Exclusão realizada com sucesso.') 
      //busca a lista apos a exclusao
      yield put(actions.buscaListMarcasStart()) 
      const responseList = yield service.findListPagination(action.query);
      const marcas = responseList.data.content;
      const totalPages = responseList.data.totalPages;
      const itemsCountPerPage = responseList.data.size;
      const totalElements = responseList.data.totalElements;
      yield put(actions.buscaListMarcasSucess(marcas, totalPages, itemsCountPerPage, totalElements ))
    }else{
      throw  new Error('Erro ao tentar realizar a exclusão'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.deleteMarcasError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

export function* watchListMarcas() {
  yield takeLatest(types.BUSCA_LIST_MARCA, buscaListMarcasSaga)  
}

export function* watchDeleteMarca() {
  yield takeLatest(types.DELETE_MARCA, deleteMarcaSaga)
}

export function* watchMarca() {
  yield takeLatest(types.BUSCA_MARCA, buscaMarcaSaga)  
}
