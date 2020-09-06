import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './types';

// Sagas always listen to requests actions
export const loginRequest = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: {
    email,
    password,
  },
});

// Both success and error actions go directly to reducers
export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: {
    token: data.token,
  },
});

export const loginError = (data) => ({
  type: LOGIN_ERROR,
  payload: {
    error: data.message,
  },
});
