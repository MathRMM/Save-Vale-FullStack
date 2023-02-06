import api from './api';

export async function save(body, token) {
  console.log(body)
  const response = await api.post('/address', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getAddress(token) {
  const response = await api.get('/address', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
//
