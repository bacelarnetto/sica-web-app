export function serializeQuery(query) {
  return Object.keys(query)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&');
}

export const isEdit = (value) => {
  return  value !== '' && value !== 'new' && value !== undefined
}

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export function temAcesso(roles = [], role = null) {  
  if( role !== null &&  role !== '' &&  role.length !== 0  && roles !== '' &&
    roles !== null && roles  !== [] && roles.length !== 0 ){
    let idx = roles.indexOf(role)
    while (idx !== -1) {
      return true
    }
  }
  return false
}


