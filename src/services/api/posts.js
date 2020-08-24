import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

export const getPosts = () => axios.get('/posts', {
  params: {
    _limit: 10,
  },
});

export const deletePost = (postId) => axios.delete(`/posts/${postId}`);

export const createPost = ({ title, body }) => axios.post('/posts', {
  title,
  body,
  userId: 1,
});
