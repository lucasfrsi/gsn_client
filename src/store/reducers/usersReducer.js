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
        user: {
          profile: payload.user.profile,
          _id: payload.user._id,
          nickname: payload.user.nickname,
          avatar: payload.user.avatar,
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default usersReducer;
