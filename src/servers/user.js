/* eslint-disable no-console */
import api from './api';
//import api_node from './api_node';

import globalTypes from './../common/constants/GlobalTypes'


export const UserService = {
  authUser: async (email) => {
    try {
      return await api.get(globalTypes.url.USER + email)
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
      throw  new Error('Não foi possível retornar o usuario. ', error.response.data.message);         
    }
  },
}
