/* eslint-disable no-console */
import api from './api';
import globalTypes from './../common/constants/GlobalTypes'


export const GeralService = { 

  getQntAlertBarragem: async () => {
    try {
      const response = await api.get(globalTypes.url.BARRAGEM_QNT_ALERT)
      return response.data
    } catch (error) {
      console.error('Erro: ' + JSON.stringify(error.response.data))
    }
  },
     

}
