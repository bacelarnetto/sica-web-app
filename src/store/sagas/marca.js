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
  } catch (error) {
    yield put(actions.buscaMarcasError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* deleteMarcaSaga(action) {
  yield put(actions.deleteMarcasStart())
  try {    
    const responseDelete = yield service.submitMarca(action.itemSelected+1+1,'delete'); 
    console.log(responseDelete)
    if(responseDelete != undefined && responseDelete != null &&
    (responseDelete.status === 200|| responseDelete.status === 204)) {
      yield put(actions.deleteMarcasSucess())
      toastr.success('Sucesso', 'Exclusão Realizada com sucesso.') 
      //busca a lista apos a exclusao
      yield put(actions.buscaMarcasStart()) 
      const responseList = yield service.findListPagination(action.query);
      const marcas = responseList.data.content;
      const totalPages = responseList.data.totalPages;
      const itemsCountPerPage = responseList.data.size;
      const totalElements = responseList.data.totalElements;
      yield put(actions.buscaMarcasSucess(marcas, totalPages, itemsCountPerPage, totalElements ))
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
  yield takeLatest(types.BUSCA_LIST_MARCA, buscaMarcasSaga)  
}

export function* watchDeleteMarcas() {
  yield takeLatest(types.DELETE_MARCA, deleteMarcaSaga)
}
