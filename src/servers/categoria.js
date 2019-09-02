/* eslint-disable no-console */
import api from './api';

export const CategoriaService = {

  getCategoriasAsync: async () => {
    try {
      return await api.get('/categorias')
    } catch (error) {
      console.error(error)
    }
  },

  submitCategoriaAsync: async (values, method) => {
    try {
      const id = values.id ? values.id : ''
      return await api[method](`/categorias/${id}`, values)
    } catch (error) {
      console.error(error)
    }
  }
  
}
