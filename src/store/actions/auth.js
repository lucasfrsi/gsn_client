import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOADUSER_REQUEST,
  LOADUSER_SUCCESS,
  LOADUSER_ERROR,
  LOGOUT,
} from './types';

export const logout = () => ({
  type: LOGOUT,
});

// REQUESTS
// Sagas always listen to requests actions
export const loginRequest = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: {
    email,
    password,
  },
});

export const signupRequest = (nickname, email, password) => ({
  type: SIGNUP_REQUEST,
  payload: {
    nickname,
    email,
    password,
  },
});

export const loadUserRequest = () => ({
  type: LOADUSER_REQUEST,
});

// SUCCESS AND ERROR
// Both success and error actions go directly to reducers
export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: {
    token: data.token,
  },
});

export const loginError = () => ({
  type: LOGIN_ERROR,
});

export const signupSuccess = (data) => ({
  type: SIGNUP_SUCCESS,
  payload: {
    token: data.token,
  },
});

export const signupError = () => ({
  type: SIGNUP_ERROR,
});

export const loadUserSuccess = (data) => ({
  type: LOADUSER_SUCCESS,
  payload: {
    user: data.user,
  },
});

export const loadUserError = () => ({
  type: LOADUSER_ERROR,
});
