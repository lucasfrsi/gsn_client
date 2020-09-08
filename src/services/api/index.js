import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      // LOG OUT
    }
    return Promise.reject(err);
  },
);

export default api;

// AUTH SERVICES
export const loginService = ({ email, password }) => api.post('/auth/login', {
  email,
  password,
});

export const signupService = ({ nickname, email, password }) => api.post('/auth/signup', {
  nickname,
  email,
  password,
});

export const loadUserService = () => api.get('/auth');

// USER SERVICES
