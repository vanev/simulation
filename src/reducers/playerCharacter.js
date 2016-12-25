import { KEYPRESS } from '../actions/keypress';
import location from './location';

const initialState = {
  location: {}
}

const playerCharacter = (world) => (state=initialState, { type, payload }) => {
  switch (type) {

  case KEYPRESS:
    return {
      ...state,
      location: location(world)(state.location, { type, payload })
    };

  default:
    return state;

  }
};

export default playerCharacter;
