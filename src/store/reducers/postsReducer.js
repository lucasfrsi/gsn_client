import {
  GET_POST_SUCCESS,
} from '../actions/types';

const initialState = {
  posts: [],
};

const postsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POST_SUCCESS:
      return {
        posts: [...state.posts, payload.post],
      };
    default:
      return state;
  }
};

export default postsReducer;
