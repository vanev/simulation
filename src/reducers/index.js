import { TICK } from '../actions/tick';

import playerCharacter from './playerCharacter';
import ticking from './ticking';

const initialState = {};

const index = (state=initialState, { type, payload }) => {
  switch (type) {

  case TICK:
    return state;

  default:
    return {
      ...state,
      playerCharacter: playerCharacter(state.world)(state.playerCharacter, { type, payload }),
      ticking: ticking(state.ticking, { type, payload })
    };

  }
};

export default index;
