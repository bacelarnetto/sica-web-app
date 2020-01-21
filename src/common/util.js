export function serializeQuery(query) {
  return Object.keys(query)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&');
}

export const isEdit = (value) => {
  return  value !== '' && value !== 'new'
}


