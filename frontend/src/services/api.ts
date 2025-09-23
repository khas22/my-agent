import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend API base URL
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') || '{}').token}`;
  }
  return req;
});

export const register = (formData: any) => API.post('/auth/register', formData);
export const login = (formData: any) => API.post('/auth/login', formData);

export const generateApiKey = () => API.post('/apikeys');
export const regenerateApiKey = (id: string) => API.put(`/apikeys/${id}`);
export const listApiKeys = () => API.get('/apikeys');
export const deleteApiKey = (id: string) => API.delete(`/apikeys/${id}`);
