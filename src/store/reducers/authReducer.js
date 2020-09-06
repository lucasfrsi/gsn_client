import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../actions/types';

const initialState = {
  tobedone: true,
  error: '',
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
      };
    case LOGIN_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
