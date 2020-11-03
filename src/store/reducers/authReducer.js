import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOADUSER_SUCCESS,
  LOADUSER_ERROR,
  LOGOUT,
  CHANGE_USER_AVATAR_SUCCESS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOADUSER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
      };
    case CHANGE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: payload.avatar,
        },
      };
    case LOADUSER_ERROR: // Account deleted is the same as these
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
    default:
      return state;
  }
};

export default authReducer;
