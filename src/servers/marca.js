/* eslint-disable no-console */
import api from './api';
//import api_node from './api_node';

import { serializeQuery, isEdit }  from './../common/util'

const Method = {
  DELETE: 'delete',
  POST: 'post',
  PUT: 'put',
}

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

  deleteMarca: async (value) => {
    try {
      const id = value;
      return await api[Method.DELETE](`/marca/${id}`, value)
    } catch (error) {
      console.error(error)
    }
  },

  submitMarca: async (value) => {
    try {
      const id = isEdit(value.id) ? value.id : ''
      const method = isEdit(value.id) ? Method.PUT: Method.POST
      return await api[method](`/marca/${id}`, value)
    } catch (error) {
      console.error(error)
    }
  },

  findMarcaById: async id => {
    try {
      return await api.get(`/marca/${id}`)
    } catch (error) {
      console.error(error)
    }
  },

  
}
