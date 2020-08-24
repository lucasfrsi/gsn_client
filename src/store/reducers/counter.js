import { INCREASE_COUNTER, DECREASE_COUNTER, RESET_COUNTER } from '../actions/types';

// const initialState = {
//   counter: 0,
// };
const initialState = 0;

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_COUNTER:
      // return { counter: state.counter + 1 };
      return state + 1;
    case DECREASE_COUNTER:
      // return { counter: state.counter - 1 };
      return state - 1;
    case RESET_COUNTER:
      // return { counter: 0 };
      return 0;
    default:
      return state;
  }
};

export default counterReducer;
