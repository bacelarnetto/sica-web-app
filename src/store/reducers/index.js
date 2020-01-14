import { combineReducers } from 'redux';
import categoria from './categoria';
import marca from './marca';
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  toastr: toastrReducer,
  categoria,
  marca
});

export default rootReducer;
