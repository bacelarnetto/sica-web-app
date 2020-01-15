/* eslint-disable no-console */
import api from './api';
import api_node from './api_node';

import { serializeQuery }  from './../common/util'

export const MarcaService = {

  findListPagination: async (query) => {
    try {
      return await api.get(`/marca/list-page?${serializeQuery({
        name: query.nome,
        lines_per_page: query.lines_per_page,
        page: query.page,
        order_by: query.order_by,
        direction: query.direction
      })}`)
    } catch (error) {
      console.error(error)
    }
  },

  submitMarca: async (value, method) => {
    try {
      const id = value ? value : ''
      return await api[method](`/marca/${id}`, value)
    } catch (error) {
      console.error(error)
    }
  },

  
}
