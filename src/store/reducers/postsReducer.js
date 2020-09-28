import {
  GET_USER_SUCCESS,
  LIKE_POST_SUCCESS,
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
    default:
      return state;
  }
};

export default postsReducer;
