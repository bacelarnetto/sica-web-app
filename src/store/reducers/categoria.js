import { Types as types} from '../actions/categoria';

const INITIAL_STATE = {
  loading: false, 
  data: [],
  totalPages: 0,
  itemsCountPerPage: 0,
  totalElements: 0,  
  erro: false
}
  
export default (state = INITIAL_STATE, action) => {
      
  switch (action.type) {
    case types.BUSCA_LIST_CATEGORIA_START:
      return {
        loading: true,
        data: [],
        totalPages: 0,
        itemsCountPerPage: 0,
        totalElements: 0,
        erro: false
      };
    
    case types.BUSCA_LIST_CATEGORIA_SUCCESS:
      return {
        loading: false,
        data: action.data,
        totalPages: action.totalPages,
        itemsCountPerPage: action.itemsCountPerPage,
        totalElements: action.totalElements,
        erro: false
      };
    
    case types.BUSCA_LIST_CATEGORIA_ERROR:
      return {
        loading: false,
        data: [],
        totalPages: 0,
        itemsCountPerPage: 0,
        totalElements: 0,
        erro: true
      };
    
    default: return state;
    
  }
    
    
}