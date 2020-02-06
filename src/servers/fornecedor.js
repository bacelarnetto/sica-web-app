/* eslint-disable no-console */
import api from './api';
//import api_node from './api_node';

import { serializeQuery, isEdit }  from './../common/util'
import globalTypes from './../common/constants/GlobalTypes'


export const FornecedorService = {

  findListPagination: async (query) => {
    try {
      return await api.get(globalTypes.url.ATIVO_FORNECEDOR_LIST_PAGE + serializeQuery({
        name: query.nome,
        lines_per_page: query.lines_per_page,
        page: query.page,
        order_by: query.order_by,
        direction: query.direction
      }))
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  deleteFornecedor: async (value) => {
    try {
      const id = value;
      return await api[globalTypes.method.DELETE](globalTypes.url.ATIVO_FORNECEDOR + id, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  submitFornecedor: async (value) => {
    try {
      const id = isEdit(value.id) ? value.id : ''
      const method = isEdit(value.id) ? globalTypes.method.PUT: globalTypes.method.POST
      return await api[method](globalTypes.url.ATIVO_FORNECEDOR + id, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  findFornecedorById: async (id ) => {
    try {
      return await api.get(globalTypes.url.ATIVO_FORNECEDOR + id)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  findAllFornecedores: async () => {
    try {
      return await api.get(globalTypes.url.ATIVO_FORNECEDOR_LIST)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },
 
}
