import { PAUSE } from '../actions/pause';
import { PLAY } from '../actions/play';

const initialState = false;

const ticking = (state=initialState, { type, payload }) => {
  switch (type) {

  case PAUSE:
    return false;

  case PLAY:
    return true;

  default:
    return state;

  }
};

export default ticking;
