import { GET_POSTS_REQUEST, GET_POSTS_SUCCESS, DELETE_POST_REQUEST, CREATE_POST_REQUEST, POSTS_ERROR } from './types';

export const getPostsRequestAction = () => ({
  type: GET_POSTS_REQUEST,
});

export const getPostsSuccessAction = (posts) => ({
  type: GET_POSTS_SUCCESS,
  payload: {
    posts,
  },
});

export const deletePostRequestAction = (postId) => ({
  type: DELETE_POST_REQUEST,
  payload: {
    postId,
  },
});

export const createPostRequestAction = (title, body) => ({
  type: CREATE_POST_REQUEST,
  payload: {
    title,
    body,
  },
});

export const postsErrorAction = (error) => ({
  type: POSTS_ERROR,
  payload: {
    error,
  },
});
