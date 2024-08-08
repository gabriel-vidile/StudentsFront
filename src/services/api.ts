import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7111', 
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

const token = localStorage.getItem('token');
setAuthToken(token);

export default api;
