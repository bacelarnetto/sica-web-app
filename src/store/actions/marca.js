export const Types = {
  BUSCA_LIST_MARCA: 'list/BUSCA_MARCA',
  BUSCA_LIST_MARCA_START: 'list/BUSCA_MARCA_START',
  BUSCA_LIST_MARCA_SUCCESS: 'list/BUSCA_MARCA_SUCCESS',
  BUSCA_LIST_MARCA_ERROR: 'list/BUSCA_MARCA_ERROR',
  DELETE_MARCA: 'list/DELETE_MARCA',
  DELETE_MARCA_START: 'list/DELETE_MARCA_START',
  DELETE_MARCA_SUCCESS: 'list/DELETE_MARCA_SUCCESS',
  DELETE_MARCA_ERROR: 'list/DELETE_MARCA_ERROR',
}

export const Creators = {
  buscaMarcas : (filter, page, rowsPerPage, order, orderBy ) => ({  
    type: Types.BUSCA_LIST_MARCA,
    query: { 
      nome: filter.nome,
      page, 
      lines_per_page: rowsPerPage, 
      direction: order.toUpperCase(), 
      order_by: orderBy
    }
  }),

  buscaMarcasStart : () => ({  
    type: Types.BUSCA_LIST_MARCA_START,
    loading: true,
    erro: false
  }),

  buscaMarcasSucess : (data, totalPages, itemsCountPerPage, totalElements) => ({
    type: Types.BUSCA_LIST_MARCA_SUCCESS,
    data,
    totalPages,
    itemsCountPerPage,
    totalElements,
    loading: false,
    erro: false
  }),

  buscaMarcasError : () => ({
    type: Types.BUSCA_LIST_MARCA_ERROR,
    loading: false,
    erro: true
  }),

  deleteMarcas: itemSelected => ({
    type: Types.DELETE_MARCA,
    itemSelected,
  }),

  deleteMarcasStart : () => ({  
    type: Types.DELETE_MARCA_START,
    loading: true,
    erro: false
  }),

  deleteMarcasSucess: () => ({
    type: Types.DELETE_MARCA_SUCCESS,
    loading: false,
    erro: false
  }),

  deleteMarcasError: () => ({
    type: Types.DELETE_MARCA_ERROR,
    loading: false,
    erro: true
  }),

}

