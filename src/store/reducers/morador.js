import { Types as types} from '../actions/insumo';

const INITIAL_STATE = {
  loading: false, 
  data: [],
  totalPages: 0,
  itemsCountPerPage: 0,
  totalElements: 0,  
  itemSelected: 0,
  erro: false,
  showMessage: '',
  insumo:'',
  typesInsumo:[],
  marcas:[],
  status:[],
}
  
export default (state = INITIAL_STATE, action) => {      
  switch (action.type) {

    case types.INSERT_INSUMO_START:
    case types.EDIT_INSUMO_START:    
    case types.DELETE_INSUMO_START:
    case types.DELETE_INSUMO_SUCCESS:// loading é true porque ainda tem que carregar a lista    
    case types.BUSCA_DETAIL_INSUMO_START:
    case types.BUSCA_LIST_INSUMO_START:
      return {
        ...state,
        loading: true
      };

    case types.INSERT_INSUMO_ERROR:
    case types.EDIT_INSUMO_ERROR:    
    case types.DELETE_INSUMO_ERROR:
    case types.BUSCA_DETAIL_INSUMO_ERROR:
    case types.BUSCA_LIST_INSUMO_ERROR:
      return {
        ...state,
        loading: false,
        erro: true
      };

    case types.BUSCA_LIST_INSUMO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        totalPages: action.totalPages,
        itemsCountPerPage: action.itemsCountPerPage,
        totalElements: action.totalElements,
      };

    case types.BUSCA_DETAIL_INSUMO_SUCCESS:
      return {
        ...state,
        loading: false,
        insumo: action.insumo,
        typesInsumo: action.typesInsumo,
        marcas: action.marcas,
        status: action.status,
      };

    case types.INSERT_INSUMO_SUCCESS:
    case types.EDIT_INSUMO_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default: return state;
    
  }
       
}