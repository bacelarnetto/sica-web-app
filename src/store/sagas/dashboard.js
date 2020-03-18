import { takeEvery, put, all } from 'redux-saga/effects'
import { Types as types, Creators as actions } from '../actions/dashboard';
import { DashboardService as service }  from './../../servers/dashboard'
import { toastr } from 'react-redux-toastr'

import {  getRandomColor }  from './../../common/util';

function* buscaDashboardSaga() {
  yield put(actions.buscaDashboardStart())
  try {        
    const qntInsumo = yield service.getQntInsumo()
    const qntManutencao = yield service.getQntManutencao()
    const qntBarragem = yield service.getQntBarragem()
    const qntMorador = yield service.getQntMorador()
    const resumeBarragemMorador = yield service.getResumeBarragemMorador()
    const listQntMoradores = yield resumeBarragemMorador.map(qnt => qnt.totalMorador);
    const listBarragem = yield resumeBarragemMorador.map(bar => bar.nomeBarragem);
    const listColor = yield resumeBarragemMorador.map(bar => getRandomColor());

    yield put(actions.buscaDashboardSucess(
      qntInsumo,
      qntManutencao,
      qntBarragem,
      qntMorador,
      resumeBarragemMorador,
      listQntMoradores,
      listBarragem,
      listColor,
    )) 
  } catch (error) {
    yield put(actions.buscaDashboardError())
    toastr.error('Erro:', error.message)
    console.error(error) // eslint-disable-line
  }
}

export function* watchDashboard() {
  yield all([
    takeEvery(types.BUSCA_DASHBOARD, buscaDashboardSaga) ,
  ]);
}
