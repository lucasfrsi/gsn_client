import {
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  LIKE_POST_SUCCESS,
  LIKE_POST_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
} from '../actions/types';

const initialState = {
  loading: true,
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
    case GET_USER_ERROR:
    case LIKE_POST_ERROR:
    case DELETE_POST_ERROR:
    case CREATE_POST_ERROR:
    default:
      return state;
  }
};

export default postsReducer;
