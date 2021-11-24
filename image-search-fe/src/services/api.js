import * as mocks from './mocks'

global.production = true

async function postData(url = '', data = {}) {
  if (!global.production) {
    return mocks.post(url, data)
  }

  const userAuthToken = localStorage.getItem('userAuthToken')
  const token = sessionStorage.getItem('userAuthToken')

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: userAuthToken || token,
    },
    body: JSON.stringify(data),
  })
  const dataRes = await response.json()
  return {
    status: response.status,
    response: dataRes,
  }
}

async function postMultipartData(url = '', data = {}) {
  if (!global.production) {
    return mocks.post(url, data)
  }

  const userAuthToken = localStorage.getItem('userAuthToken')
  const token = sessionStorage.getItem('userAuthToken')

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: userAuthToken || token,
    },
    body: data,
  })
  const dataRes = await response.json()
  return {
    status: response.status,
    response: dataRes,
  }
}

async function getData(url = '') {
  if (!global.production) {
    return mocks.get(url)
  }

  const userAuthToken = localStorage.getItem('userAuthToken')
  const token = sessionStorage.getItem('userAuthToken')

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      // FIXME: Enabling this breaks CORS:
      // Authorization: undefined && (userAuthToken || token),
    },
  })

  const dataRes = await response.json()

  return {
    status: response.status,
    response: dataRes,
  }
}

export const api = {
  get: getData,
  post: postData,
  postMultipart: postMultipartData
}

export default api
