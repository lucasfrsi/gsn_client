import {
  SEARCHUSER_SUCCESS,
  SEARCHUSER_ERROR,
  SEARCHUSER_CLEAR,
} from '../actions/types';

const initialState = {
  result: [],
};

const searchReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCHUSER_SUCCESS:
      return {
        ...state,
        result: [...payload.users],
      };
    case SEARCHUSER_CLEAR:
      return {
        ...state,
        result: [],
      };
    case SEARCHUSER_ERROR:
    default:
      return state;
  }
};

export default searchReducer;
