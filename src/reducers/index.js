import { TICK } from '../actions/tick';
import ticking from './ticking';

const initialState = {};

const index = (state=initialState, { type, payload }) => {
  switch (type) {

  case TICK:
    return state;

  default:
    return {
      ...state,
      ticking: ticking(state.ticking, { type, payload })
    };

  }
};

export default index;
