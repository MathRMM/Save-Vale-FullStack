import api from './api';

export async function getAddress(cep) {
  const response = await api.get(`address/cep?cep=${cep}`)
  return response.data;
}
//
