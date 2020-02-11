import { combineReducers } from 'redux';
import marca from './marca';
import auth from './auth';
import insumo from './insumo';
import fornecedor from './fornecedor';
import pedido from './pedido';
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  toastr: toastrReducer,
  auth,
  marca,
  insumo,  
  fornecedor,
  pedido,
});

export default rootReducer;
