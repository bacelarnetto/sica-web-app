import { combineReducers } from 'redux';
import marca from './marca';
import auth from './auth';
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  toastr: toastrReducer,
  marca,
  auth
});

export default rootReducer;
