/* eslint-disable no-console */
import api from './api';
//import api_node from './api_node';

import { serializeQuery, isEdit }  from './../common/util'
import globalTypes from './../common/constants/GlobalTypes'


export const ManutencaoService = {

  findListPagination: async (query) => {
    try {
      return await api.get(globalTypes.url.ATIVO_MANUTENCAO_LIST_PAGE + serializeQuery({
        lines_per_page: query.lines_per_page,
        page: query.page,
        order_by: query.order_by,
        direction: query.direction
      }))
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  deleteManutencao: async (value) => {
    try {
      const id = value;
      return await api[globalTypes.method.DELETE](globalTypes.url.ATIVO_MANUTENCAO + id, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  submitManutencao: async (value) => {
    try {
      const id = isEdit(value.id) ? value.id : ''
      const method = isEdit(value.id) ? globalTypes.method.PUT: globalTypes.method.POST
      return await api[method](globalTypes.url.ATIVO_MANUTENCAO + id, value)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  findManutencaoById: async (id ) => {
    try {
      return await api.get(globalTypes.url.ATIVO_MANUTENCAO + id)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },

  findTypesManutencao: async () => {
    try {
      return await api.get(globalTypes.url.ATIVO_MANUTENCAO_TIPOS)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },
 
}
