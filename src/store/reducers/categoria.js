import { Types as types} from '../actions/categoria';

const INITIAL_STATE = {
  loading: false, 
  data: [],  
  erro: false
}
  
export default (state = INITIAL_STATE, action) => {
      
  switch (action.type) {
    case types.BUSCA_LIST_CATEGORIA_START:
      return {
        loading: true,
        data: [],
        erro: false
      };
    
    case types.BUSCA_LIST_CATEGORIA_SUCCESS:
      return {
        loading: false,
        data: action.data,
        erro: false
      };
    
    case types.BUSCA_LIST_CATEGORIA_ERROR:
      return {
        loading: false,
        data: [],
        erro: true
      };
    
    default: return state;
    
  }
    
    
}
