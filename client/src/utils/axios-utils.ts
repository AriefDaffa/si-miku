import axios from 'axios';

const baseAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
});

// baseAPI.interceptors.response.use(
//   (res) => {
//     // console.log('## res', res);
//     return res;
//   },
//   (err) => {
//     // console.log('## err status', err.response.status);
//     if (err.response.status === 403 || err.response.status === 401) {
//       // window.location.href = '/login';
//     }
//     return Promise.reject(err);
//   }
// );

export default baseAPI;
