import {
  GET_USER_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: true,
  user: null,
  users: [],
};

const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        loading: false,
      };
    default:
      return state;
  }
};

export default usersReducer;
