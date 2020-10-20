import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_ERROR,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
} from './types';

// REQUESTS
// Sagas always listen to requests actions
export const getPostRequest = (postId) => ({
  type: GET_POST_REQUEST,
  payload: {
    postId,
  },
});

export const getPostsRequest = () => ({
  type: GET_POSTS_REQUEST,
});

export const likePostRequest = (postId, likeType) => ({
  type: LIKE_POST_REQUEST,
  payload: {
    postId,
    likeType,
  },
});

export const deletePostRequest = (postId) => ({
  type: DELETE_POST_REQUEST,
  payload: {
    postId,
  },
});

export const createPostRequest = (text) => ({
  type: CREATE_POST_REQUEST,
  payload: {
    text,
  },
});

export const editPostRequest = (postId, text) => ({
  type: EDIT_POST_REQUEST,
  payload: {
    postId,
    text,
  },
});

export const createCommentRequest = (postId, text) => ({
  type: CREATE_COMMENT_REQUEST,
  payload: {
    postId,
    text,
  },
});

export const deleteCommentRequest = (postId, commentId) => ({
  type: DELETE_COMMENT_REQUEST,
  payload: {
    postId,
    commentId,
  },
});

// SUCCESS AND ERROR
// Both success and error actions go directly to reducers
export const getPostSuccess = (data) => ({
  type: GET_POST_SUCCESS,
  payload: {
    post: data,
  },
});

export const getPostError = () => ({
  type: GET_POST_ERROR,
});

export const getPostsSuccess = (posts) => ({
  type: GET_POSTS_SUCCESS,
  payload: {
    posts,
  },
});

export const getPostsError = () => ({
  type: GET_POSTS_ERROR,
});

export const likePostSuccess = (post) => ({
  type: LIKE_POST_SUCCESS,
  payload: {
    post,
  },
});

export const likePostError = () => ({
  type: LIKE_POST_ERROR,
});

export const deletePostSuccess = (postId) => ({
  type: DELETE_POST_SUCCESS,
  payload: {
    postId,
  },
});

export const deletePostError = () => ({
  type: DELETE_POST_ERROR,
});

export const createPostSuccess = (post) => ({
  type: CREATE_POST_SUCCESS,
  payload: {
    post,
  },
});

export const createPostError = () => ({
  type: CREATE_POST_ERROR,
});

export const editPostSuccess = (post) => ({
  type: EDIT_POST_SUCCESS,
  payload: {
    post,
  },
});

export const editPostError = () => ({
  type: EDIT_POST_ERROR,
});

export const createCommentSuccess = (comments) => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: {
    comments,
  },
});

export const createCommentError = () => ({
  type: CREATE_COMMENT_ERROR,
});

export const deleteCommentSuccess = (commentId) => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: {
    commentId,
  },
});

export const deleteCommentError = () => ({
  type: DELETE_COMMENT_ERROR,
});
