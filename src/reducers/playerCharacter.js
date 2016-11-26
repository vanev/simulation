import { KEYPRESS } from '../actions/keypress';

const initialState = {
  location: {
    x: 0,
    y: 0
  }
}

const location = (world) => (location, { type, payload }) => {
  switch (payload.key) {

  case "w":
    return {
      x: location.x,
      y: location.y - 1
    };

  case "a":
    return {
      x: location.x - 1,
      y: location.y
    };

  case "s":
    return {
      x: location.x,
      y: location.y + 1
    };

  case "d":
    return {
      x: location.x + 1,
      y: location.y
    };

  default:
    return location;

  }
};

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
