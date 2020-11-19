import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_RANDOM_USER_REQUEST,
  GET_RANDOM_USER_SUCCESS,
  CHANGE_USER_AVATAR_SUCCESS,
  CHANGE_USER_COVER_SUCCESS,
  UPDATE_USER_PROFILE_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: true,
  featuredUser: null,
  user: null,
};

const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_REQUEST:
    case GET_RANDOM_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
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
        loading: false,
      };
    case CHANGE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: payload.avatar,
        },
        loading: false,
      };
    case CHANGE_USER_COVER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            cover: payload.cover,
          },
        },
        loading: false,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          profile: payload.profile,
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default usersReducer;
