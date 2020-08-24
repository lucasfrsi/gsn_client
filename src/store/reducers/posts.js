import { GET_POSTS_SUCCESS, POSTS_ERROR } from '../actions/types';

const initialState = {
  postsList: [],
  error: '',
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        postsList: action.payload.posts,
      };
    case POSTS_ERROR:
      // eslint-disable-next-line no-console
      console.log('[POSTS_ERROR REDUCER - MESSAGE COMING FROM SAGA]', action.payload.error);
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default postsReducer;
