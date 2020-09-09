import {
  SEARCHUSER_REQUEST,
  SEARCHUSER_SUCCESS,
  SEARCHUSER_ERROR,
  SEARCHUSER_CLEAR,
  SEARCHUSER_CANCEL,
} from './types';

// REQUESTS
// Sagas always listen to requests actions
export const searchUserRequest = (query) => ({
  type: SEARCHUSER_REQUEST,
  payload: {
    query,
  },
});

// SUCCESS AND ERROR
// Both success and error actions go directly to reducers
export const searchUserSuccess = (data) => ({
  type: SEARCHUSER_SUCCESS,
  payload: {
    users: data,
  },
});

export const searchUserError = () => ({
  type: SEARCHUSER_ERROR,
});

// OTHERS
export const searchUserCancel = () => ({
  type: SEARCHUSER_CANCEL,
});

export const searchUserClear = () => ({
  type: SEARCHUSER_CLEAR,
});
