import api from './api';

async function getAllInstitutes() {
  const response = await api.get('enroll/institute');
  return response.data
}

const institutesApi = {
    getAllInstitutes
}

export { institutesApi }
