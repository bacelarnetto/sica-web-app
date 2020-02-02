//const BASE_URL = 'http://localhost:8084'
//const BASE_URL = 'http://localhost:8080/gateway'
//const BASE_URL = 'https://api-server-mock.herokuapp.com'

const url = {
  BASE: 'http://localhost:8080/gateway',

  LOGIN: '/auth/login',

  ATIVO_MARCA_LIST_PAGE: '/ativo/marca/list-page?',
  ATIVO_MARCA_LIST: '/ativo/marca/list',
  ATIVO_MARCA: '/ativo/marca/',

  ATIVO_INSUMO_LIST: '/ativo/insumo/list-page?',
  ATIVO_INSUMO: '/ativo/insumo/',
  ATIVO_INSUMO_TIPOS: '/ativo/insumo/types',
  ATIVO_INSUMO_STATUS: '/ativo/insumo/status',

  USER: '/auth/user/',
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
