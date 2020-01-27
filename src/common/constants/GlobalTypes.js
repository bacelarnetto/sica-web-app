//const BASE_URL = 'http://localhost:8084'
//const BASE_URL = 'http://localhost:8080/gateway'
//const BASE_URL = 'https://api-server-mock.herokuapp.com'

const url = {
  BASE: 'http://localhost:8080/gateway',
  LOGIN: '/auth/login',
  ATIVO_MARCA_LIST: '/ativo/marca/list-page?',
  ATIVO_MARCA: '/ativo/marca/'
}

const method = {
  DELETE: 'delete',
  POST: 'post',
  PUT: 'put',
}

export default {
  url,
  method
}
