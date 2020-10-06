import {
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_MOMENTS_SUCCESS,
  GET_MOMENTS_ERROR,
  CREATE_MOMENT_SUCCESS,
  CREATE_MOMENT_ERROR,
  DELETE_MOMENT_SUCCESS,
  DELETE_MOMENT_ERROR,
  REACT_MOMENT_SUCCESS,
  REACT_MOMENT_ERROR,
} from '../actions/types';

const initialState = {
  loading: true,
  moments: [],
};

const momentsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        moments: [...payload.user.moments],
        loading: false,
      };
    case GET_MOMENTS_SUCCESS:
      return {
        ...state,
        moments: [...payload.moments],
        loading: false,
      };
    case CREATE_MOMENT_SUCCESS:
      return {
        ...state,
        moments: [...state.moments, payload.moment],
        loading: false,
      };
    case DELETE_MOMENT_SUCCESS:
      return {
        ...state,
        moments: state.moments.filter((moment) => moment._id !== payload.momentId),
        loading: false,
      };
    case REACT_MOMENT_SUCCESS:
      return {
        ...state,
        moments: state.moments.map((moment) => (moment._id === payload.moment._id ? { ...moment, reactions: payload.moment.reactions } : moment)),
        loading: false,
      };
    case GET_USER_ERROR:
    case GET_MOMENTS_ERROR:
    case CREATE_MOMENT_ERROR:
    case DELETE_MOMENT_ERROR:
    case REACT_MOMENT_ERROR:
    default:
      return state;
  }
};

export default momentsReducer;
