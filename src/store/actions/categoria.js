export const Types = {
  CATEGORIAS_FETCHED: 'list/CATEGORIAS_FETCHED',
  CATEGORIAS_FETCHED_PENDING: 'list/CATEGORIAS_FETCHED_PENDING',
  CATEGORIAS_FETCHED_SUCCESS: 'list/CATEGORIAS_FETCHED_SUCCESS',
  CATEGORIAS_FETCHED_ERROR: 'list/CATEGORIAS_FETCHED_ERROR',
}

export const Creators = {
  buscaCategorias : () => ({  
    type:  Types.CATEGORIAS_FETCHED_PENDING,
    carregando: true,
    erro: false
  }),

  buscaCategoriasSucess : (categorias) => ({
    type:  Types.CATEGORIAS_FETCHED_SUCCESS,
    categorias,
    carregando: false,
    erro: false
  }),

  buscaCategoriasError : () => ({
    type:  Types.CATEGORIAS_FETCHED_ERROR,
    carregando: false,
    erro: true
  })

}

