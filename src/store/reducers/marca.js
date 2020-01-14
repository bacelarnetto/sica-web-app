import { Types as types} from '../actions/marca';

const INITIAL_STATE = {
  loading: false, 
  data: [],
  totalPages: 0,
  itemsCountPerPage: 0,
  totalElements: 0,  
  itemSelected: 0,
  erro: false
}
  
export default (state = INITIAL_STATE, action) => {
      
  switch (action.type) {
    case types.BUSCA_LIST_MARCA_START:
      return {
        loading: true,
        data: [],
        totalPages: 0,
        itemsCountPerPage: 0,
        totalElements: 0,
        erro: false
      };
    
    case types.BUSCA_LIST_MARCA_SUCCESS:
      return {
        loading: false,
        data: action.data,
        totalPages: action.totalPages,
        itemsCountPerPage: action.itemsCountPerPage,
        totalElements: action.totalElements,
        erro: false
      };
    
    case types.BUSCA_LIST_MARCA_ERROR:
      return {
        loading: false,
        data: [],
        totalPages: 0,
        itemsCountPerPage: 0,
        totalElements: 0,
        erro: true
      };

    case types.DELETE_MARCA_START:
      return {
        loading: true,
        erro: false
      };
    
    case types.DELETE_MARCA_SUCCESS:
      return {
        loading: true,
        data: [],
        totalPages: 0,
        itemsCountPerPage: 0,
        totalElements: 0,
        erro: false
      };

    case types.DELETE_MARCA_ERROR:
      return {
        loading: false,
        erro: true
      };
    
    default: return state;
    
  }
    
    
}
