import { takeLatest, takeEvery, put, all } from 'redux-saga/effects'
import { Types as types, Creators as actions } from '../actions/insumo';
import { InsumoService as service }  from './../../servers/insumo'
import { toastr } from 'react-redux-toastr'

function* buscaListInsumosSaga(action) {
  yield put(actions.buscaListInsumosStart())
  try {    
    const response = yield service.findListPagination(action.query);
    const insumos = response.data.content;
    const totalPages = response.data.totalPages;
    const itemsCountPerPage = response.data.size;
    const totalElements = response.data.totalElements;
    yield put(actions.buscaListInsumosSucess(insumos, totalPages, itemsCountPerPage, totalElements )) 
  } catch (error) {
    yield put(actions.buscaListInsumosError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* buscaInsumoSaga(action) {
  yield put(actions.buscaInsumoStart())
  try {    
    const response = yield service.findInsumoById(action.itemSelected);
    const insumo = response.data;
    yield put(actions.buscaInsumoSucess(insumo)) 
  } catch (error) {
    yield put(actions.buscaInsumoError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* deleteInsumoSaga(action) {
  yield put(actions.deleteInsumosStart())
  try {    
    const responseDelete = yield service.deleteInsumo(action.itemSelected); 
    if(responseDelete !== undefined && responseDelete !== null &&
    (responseDelete.status === 200 || responseDelete.status === 204)) {
      yield put(actions.deleteInsumosSucess())
      toastr.success('Sucesso:', 'Exclusão realizada com sucesso.') 
      //busca a lista apos a exclusao
      yield put(actions.buscaListInsumosStart()) 
      const responseList = yield service.findListPagination(action.query);
      const insumos = responseList.data.content;
      const totalPages = responseList.data.totalPages;
      const itemsCountPerPage = responseList.data.size;
      const totalElements = responseList.data.totalElements;
      yield put(actions.buscaListInsumosSucess(insumos, totalPages, itemsCountPerPage, totalElements ))
    }else{
      throw new Error('Erro ao tentar realizar a exclusão'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.deleteInsumosError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}


function* editInsumoSaga(action) {
  yield put(actions.editInsumoStart())
  try {    
    const response = yield service.submitInsumo(action.Insumo); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 204)) {
      yield put(actions.editInsumoSucess())
      toastr.success('Sucesso:', 'Alteração realizada com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar a alteração'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.editInsumoError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

function* insertInsumoSaga(action) {
  yield put(actions.insertInsumoStart())
  try {    
    const response = yield service.submitInsumo(action.Insumo); 
    if(response !== undefined && response !== null &&
    (response.status === 200 || response.status === 201)) {
      yield put(actions.insertInsumoSucess())
      toastr.success('Sucesso:', 'Cadastro realizado com sucesso.') 
    }else{
      throw new Error('Erro ao tentar realizar o cadastro'); // gera uma exceção
    }
  } catch (error) {
    yield put(actions.insertInsumoError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

export function* watchInsumo() {
  yield all([
    takeEvery(types.BUSCA_INSUMO, buscaInsumoSaga) ,
    takeLatest(types.INSERT_INSUMO, insertInsumoSaga),
    takeLatest(types.DELETE_INSUMO, deleteInsumoSaga),
    takeLatest(types.EDIT_INSUMO, editInsumoSaga),
    takeEvery(types.BUSCA_LIST_INSUMO, buscaListInsumosSaga) 
  ]);
}
