import {
  SET_ALERT,
  REMOVE_ALERT,
} from './types';

export const setAlert = (data) => ({
  type: SET_ALERT,
  payload: {
    data,
  },
});

export const removeAlert = () => ({
  type: REMOVE_ALERT,
});
