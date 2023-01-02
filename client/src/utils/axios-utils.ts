import axios from 'axios';

const baseAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
});

export default baseAPI;
