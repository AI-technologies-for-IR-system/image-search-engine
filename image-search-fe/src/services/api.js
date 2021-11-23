async function postData(url = '', data = {}) {
  const userAuthToken = localStorage.getItem('userAuthToken');
  const token = sessionStorage.getItem('userAuthToken');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': userAuthToken || token,
    },
    body: JSON.stringify(data)
  });
  const dataRes = await response.json();
  return {
    status: response.status,
    response: dataRes,
  };
}

async function getData(url = '') {
  const userAuthToken = localStorage.getItem('userAuthToken');
  const token = sessionStorage.getItem('userAuthToken');

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': userAuthToken || token,
    },
  });
  const dataRes = await response.json();
  return {
    status: response.status,
    response: dataRes,
  };
}

export const api = {
  get: getData,
  post: postData,
};

export default api;