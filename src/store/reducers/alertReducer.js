import {
  SET_ALERT,
  REMOVE_ALERT,
} from '../actions/types';

const initialState = {
  data: null,
};

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        data: payload.data,
      };
    case REMOVE_ALERT:
      return {
        data: null,
      };
    default:
      return state;
  }
};

export default alertReducer;
