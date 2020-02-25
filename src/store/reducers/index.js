import { combineReducers } from 'redux';
import marca from './marca';
import auth from './auth';
import insumo from './insumo';
import fornecedor from './fornecedor';
import pedido from './pedido';
import manutencao from './manutencao';
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  toastr: toastrReducer,
  auth,
  marca,
  insumo,  
  fornecedor,
  pedido,
  manutencao,
});

export default rootReducer;
