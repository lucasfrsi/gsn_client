import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import appStore from '../../store';
import { logout } from '../../store/actions/auth';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      appStore.dispatch(logout());
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

// SEARCH SERVICE
export const searchUserService = (query) => api.get(`/users/search/${query}`);
