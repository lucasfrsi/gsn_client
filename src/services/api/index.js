import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
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

export const loginService = ({ email, password }) => api.post('/api/users/login', {
  email,
  password,
});

export const signupService = ({ nickname, email, password }) => api.post('/api/users/signup', {
  nickname,
  email,
  password,
});

//  xxx.headers["Authorization"] = "Bearer " + data.token;
