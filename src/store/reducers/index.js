import { combineReducers } from 'redux';
import marca from './marca';
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  toastr: toastrReducer,
  marca
});

export default rootReducer;
