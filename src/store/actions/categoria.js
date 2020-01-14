export const Types = {
  BUSCA_LIST_CATEGORIA: 'list/BUSCA_CATEGORIA',
  BUSCA_LIST_CATEGORIA_START: 'list/BUSCA_CATEGORIA_START',
  BUSCA_LIST_CATEGORIA_SUCCESS: 'list/BUSCA_CATEGORIA_SUCCESS',
  BUSCA_LIST_CATEGORIA_ERROR: 'list/BUSCA_CATEGORIA_ERROR',
}

export const Creators = {
  buscaCategorias : (page, rowsPerPage, order, orderBy ) => ({  
    type: Types.BUSCA_LIST_CATEGORIA,
    query: { 
      page, 
      linesPerPage: rowsPerPage, 
      direction: order.toUpperCase(), 
      orderBy
    }
  }),

  buscaCategoriasStart : () => ({  
    type: Types.BUSCA_LIST_CATEGORIA_START,
    loading: true,
    erro: false
  }),

  buscaCategoriasSucess : (data, totalPages, itemsCountPerPage, totalElements) => ({
    type: Types.BUSCA_LIST_CATEGORIA_SUCCESS,
    data,
    totalPages,
    itemsCountPerPage,
    totalElements,
    loading: false,
    erro: false
  }),

  buscaCategoriasError : () => ({
    type: Types.BUSCA_LIST_CATEGORIA_ERROR,
    loading: false,
    erro: true
  })

}

