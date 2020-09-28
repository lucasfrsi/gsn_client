import {
  GET_USER_SUCCESS,
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
    default:
      return state;
  }
};

export default momentsReducer;
