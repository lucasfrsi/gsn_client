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

// USERS / PROFILE SERVICES
export const getUserService = ({ userId }) => api.get(`/users/${userId}`);

// POSTS SERVICES

// Posts
export const getPosts = () => api.get('/posts');

export const getPostByIdService = ({ postId }) => api.get(`/posts/${postId}`);

export const createPostService = (text) => api.post('/posts/', {
  text,
});

export const deletePostService = (postId) => api.post(`/posts/${postId}`);

// Comments
export const createCommentService = (postId, text) => api.post(`/posts/comments/${postId}`, {
  text,
});

export const deleteCommentService = (postId, commentId) => api.delete(`/posts/comments/${postId}/${commentId}`);

// Likes
export const likePostService = ({ postId, likeType }) => api.post(`/posts/likes/${postId}`, {
  likeType,
});
