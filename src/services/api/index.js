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
export const getPostsService = () => api.get('/posts');

export const getPostByIdService = ({ postId }) => api.get(`/posts/${postId}`);

export const createPostService = ({ text }) => api.post('/posts', {
  text,
});

export const editPostService = ({ postId, text }) => api.put(`/posts/${postId}`, {
  text,
});

export const deletePostService = ({ postId }) => api.delete(`/posts/${postId}`);

// Comments
export const createCommentService = ({ postId, text }) => api.post(`/posts/comments/${postId}`, {
  text,
});

export const deleteCommentService = ({ postId, commentId }) => api.delete(`/posts/comments/${postId}/${commentId}`);

// Likes
export const likePostService = ({ postId, likeType }) => api.post(`/posts/likes/${postId}`, {
  likeType,
});

// MOMENTS SERVICES

// Moments
export const getMomentsService = () => api.get('/moments');

export const createMomentService = ({ formData }) => api.post('/moments', formData);

export const deleteMomentService = ({ momentId }) => api.delete(`/moments/${momentId}`);

// Reactions
export const reactMomentService = ({ momentId, reactionType }) => api.post(`/moments/react/${momentId}`, {
  reactionType,
});
