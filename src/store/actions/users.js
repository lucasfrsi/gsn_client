import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_RANDOM_USER_REQUEST,
  GET_RANDOM_USER_SUCCESS,
  GET_RANDOM_USER_ERROR,
  CHANGE_USER_AVATAR_REQUEST,
  CHANGE_USER_AVATAR_SUCCESS,
  CHANGE_USER_AVATAR_ERROR,
  CHANGE_USER_COVER_REQUEST,
  CHANGE_USER_COVER_SUCCESS,
  CHANGE_USER_COVER_ERROR,
} from './types';

// REQUESTS
// Sagas always listen to requests actions
export const getUserRequest = (userId) => ({
  type: GET_USER_REQUEST,
  payload: {
    userId,
  },
});

export const getRandomUserRequest = () => ({
  type: GET_RANDOM_USER_REQUEST,
});

export const changeAvatarRequest = (formData) => ({
  type: CHANGE_USER_AVATAR_REQUEST,
  payload: {
    formData,
  },
});

export const changeCoverRequest = (formData) => ({
  type: CHANGE_USER_COVER_REQUEST,
  payload: {
    formData,
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

export const getRandomUserSuccess = (randomUser) => ({
  type: GET_RANDOM_USER_SUCCESS,
  payload: {
    randomUser,
  },
});

export const getRandomUserError = () => ({
  type: GET_RANDOM_USER_ERROR,
});
