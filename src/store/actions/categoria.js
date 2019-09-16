export const Types = {
  BUSCA_LIST_CATEGORIA: 'list/BUSCA_CATEGORIA',
  BUSCA_LIST_CATEGORIA_START: 'list/BUSCA_CATEGORIA_START',
  BUSCA_LIST_CATEGORIA_SUCCESS: 'list/BUSCA_CATEGORIA_SUCCESS',
  BUSCA_LIST_CATEGORIA_ERROR: 'list/BUSCA_CATEGORIA_ERROR',
}

export const Creators = {
  buscaCategorias : () => ({  
    type: Types.BUSCA_LIST_CATEGORIA,
  }),

  buscaCategoriasStart : () => ({  
    type: Types.BUSCA_LIST_CATEGORIA_START,
    loading: true,
    erro: false
  }),

  buscaCategoriasSucess : (data) => ({
    type: Types.BUSCA_LIST_CATEGORIA_SUCCESS,
    data,
    loading: false,
    erro: false
  }),

  buscaCategoriasError : () => ({
    type: Types.BUSCA_LIST_CATEGORIA_ERROR,
    loading: false,
    erro: true
  })

}

