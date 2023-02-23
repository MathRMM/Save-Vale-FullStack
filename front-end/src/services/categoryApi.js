import api from './api';

export async function getCategory(){
  const response = await api.get('/category')
  return response.data
}

export async function save(body, token){
  const response = await api.post('category', body,{
    headers:{
      Authorization: 'Bearer ' + token
    }
  })
  return response.data
}
