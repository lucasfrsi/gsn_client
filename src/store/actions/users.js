import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from './types';

// REQUESTS
// Sagas always listen to requests actions
export const getUserRequest = (userId) => ({
  type: GET_USER_REQUEST,
  payload: {
    userId,
  },
});

// SUCCESS AND ERROR
// Both success and error actions go directly to reducers
export const getUserSuccess = (data) => ({
  type: GET_USER_SUCCESS,
  payload: {
    user: data.user,
  },
});

export const getUserError = () => ({
  type: GET_USER_ERROR,
});
