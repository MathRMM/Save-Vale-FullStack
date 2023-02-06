import api from './api';

export async function save(body, token) {
  const response = await api.post('/enroll/institute', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getPersonalInformations(token) {
  const response = await api.get('/enroll/user/institute', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
//
