/* eslint-disable no-console */
import api from './api';
//import api_node from './api_node';

import globalTypes from './../common/constants/GlobalTypes'


export const UserService = {
  getUser: async (email) => {
    try {
      return await api.get(globalTypes.url.USER + email)
    } catch (error) { 
      
      if(error.response.status === 401 || error.response.status === 403){
        console.error('Erro 403: ' + JSON.stringify(error.response.data))
        const erro = {codigoErro: 403, message: 'Não tem acesso a esse serviço'}
        throw erro; 
      } else if (error.response.status === 500){
        console.error('Erro 500: ' + JSON.stringify(error.response.data))
        const erro = {codigoErro: error.response.status, message: 'Erro no sistema! '
        + 'Não foi possível retornar o usuario:' + error.response.message}
        throw erro;
      } else {
        console.error('Erro: ' + JSON.stringify(error.response.data))
      }    
    }
  },
}
