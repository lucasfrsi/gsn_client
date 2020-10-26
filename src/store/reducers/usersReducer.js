import {
  GET_USER_SUCCESS,
  GET_RANDOM_USER_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: true,
  featuredUser: null,
  user: null,
};

const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: {
          profile: payload.user.profile,
          _id: payload.user._id,
          nickname: payload.user.nickname,
          avatar: payload.user.avatar,
        },
        loading: false,
      };
    case GET_RANDOM_USER_SUCCESS:
      return {
        ...state,
        featuredUser: { ...payload.randomUser[0] },
      };
    default:
      return state;
  }
};

export default usersReducer;
