/* eslint-disable no-console */
import api from './api';
import { serializeQuery }  from './../common/util'

export const CategoriaService = {

  findListPagination: async (query) => {
    try {
      console.log(query)
      return await api.get(`/categorias/pagination?${serializeQuery({
        linesPerPage: query.linesPerPage,
        page: query.page,
        orderBy: query.orderBy,
        direction: query.direction
      })}`)
    } catch (error) {
      console.error(error)
    }
  },

  submitCategoria: async (values, method) => {
    try {
      const id = values.id ? values.id : ''
      return await api[method](`/categorias/${id}`, values)
    } catch (error) {
      console.error(error)
    }
  }
  
}
