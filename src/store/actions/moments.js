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

// SUCCESS AND ERROR
// Both success and error actions go directly to reducers
export const getMomentsSuccess = (data) => ({
  type: GET_MOMENTS_SUCCESS,
  payload: {
    moments: data.moments,
  },
});

export const getMomentsError = () => ({
  type: GET_MOMENTS_ERROR,
});
