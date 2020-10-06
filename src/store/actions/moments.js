import {
  GET_MOMENTS_REQUEST,
  GET_MOMENTS_SUCCESS,
  GET_MOMENTS_ERROR,
  CREATE_MOMENT_REQUEST,
  CREATE_MOMENT_SUCCESS,
  CREATE_MOMENT_ERROR,
  DELETE_MOMENT_REQUEST,
  DELETE_MOMENT_SUCCESS,
  DELETE_MOMENT_ERROR,
  REACT_MOMENT_REQUEST,
  REACT_MOMENT_SUCCESS,
  REACT_MOMENT_ERROR,
} from './types';

// REQUESTS
// Sagas always listen to requests actions
export const getMomentsRequest = () => ({
  type: GET_MOMENTS_REQUEST,
});

export const createMomentRequest = (formData) => ({
  type: CREATE_MOMENT_REQUEST,
  payload: {
    formData,
  },
});

export const deleteMomentRequest = (momentId) => ({
  type: DELETE_MOMENT_REQUEST,
  payload: {
    momentId,
  },
});

export const reactMomentRequest = (momentId, reactionType) => ({
  type: REACT_MOMENT_REQUEST,
  payload: {
    momentId,
    reactionType,
  },
});

// SUCCESS AND ERROR
// Both success and error actions go directly to reducers
export const getMomentsSuccess = (moments) => ({
  type: GET_MOMENTS_SUCCESS,
  payload: {
    moments,
  },
});

export const getMomentsError = () => ({
  type: GET_MOMENTS_ERROR,
});

export const createMomentSuccess = (moment) => ({
  type: CREATE_MOMENT_SUCCESS,
  payload: {
    moment,
  },
});

export const createMomentError = () => ({
  type: CREATE_MOMENT_ERROR,
});

export const deleteMomentSuccess = (momentId) => ({
  type: DELETE_MOMENT_SUCCESS,
  payload: {
    momentId,
  },
});

export const deleteMomentError = () => ({
  type: DELETE_MOMENT_ERROR,
});

export const reactMomentSuccess = (moment) => ({
  type: REACT_MOMENT_SUCCESS,
  payload: {
    moment,
  },
});

export const reactMomentError = () => ({
  type: REACT_MOMENT_ERROR,
});
