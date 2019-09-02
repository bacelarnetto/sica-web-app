import { Types } from '../actions/categoria';

const INITIAL_STATE = {list: []}
  
export default (state = INITIAL_STATE, action) => {
    
  switch (action.type) {
    case Types.CATEGORIAS_FETCHED:
      return {
        carregando: true,
        list: [],
        erro: false
      }
    
    case Types.CATEGORIAS_FETCHED_SUCCESS:
      return {
        carregando: false,
        list: action.CATEGORIAS,
        erro: false
      }
    
    case Types.CATEGORIAS_FETCHED_ERROR:
      return {
        carregando: false,
        list: [],
        erro: true
      }
    
    default: return state
  }
    
    
}
