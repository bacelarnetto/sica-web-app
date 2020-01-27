/* eslint-disable no-console */
import api from './api';
//import api_node from './api_node';

import globalTypes from './../common/constants/GlobalTypes'


export const AuthService = {
  authUser: async (value) => {
    try {
      return await api[globalTypes.method.POST](globalTypes.url.LOGIN, value)
    } catch (error) {
      console.error(error)
      if(error.response.status === 401 || error.status === 403){
        throw  new Error('Erro ao tentar realizar o login. Senha ou email estão errados.'); 
      } else{
        throw  new Error('Erro ao tentar realizar o login.'); 
      }    
    }
  },
}
