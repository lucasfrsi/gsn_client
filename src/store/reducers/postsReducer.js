import {
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  LIKE_POST_SUCCESS,
  LIKE_POST_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
} from '../actions/types';

const initialState = {
  loading: true,
  post: null,
  posts: [],
};

const postsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        posts: [...payload.user.posts],
        loading: false,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...payload.posts],
        loading: false,
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: payload.post,
        loading: false,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === payload.post._id ? { ...post, likes: payload.post.likes } : post)),
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload.postId),
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, payload.post],
      };
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        post: { ...state.post, text: payload.post.text },
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        post: { ...state.post, comments: payload.comments },
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        post: { ...state.post, comments: state.post.comments.filter((comment) => comment._id !== payload.commentId) },
      };
    case GET_USER_ERROR:
    case LIKE_POST_ERROR:
    case DELETE_POST_ERROR:
    case CREATE_POST_ERROR:
    case EDIT_POST_ERROR:
    case CREATE_COMMENT_ERROR:
    case DELETE_COMMENT_ERROR:
    case GET_POST_ERROR:
    case GET_POSTS_ERROR:
    default:
      return state;
  }
};

export default postsReducer;
