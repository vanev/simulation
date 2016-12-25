import { LAND } from '../cell/types';
import getCell from '../world/getCell';

const initialState = {
  x: 0,
  y: 0
};

const location = (world) => (state=initialState, { type, payload }) => {
  let newState;

  switch (payload.key) {

  case "w":
    newState = {
      x: state.x,
      y: state.y - 1
    };
    break;

  case "a":
    newState = {
      x: state.x - 1,
      y: state.y
    };
    break;

  case "s":
    newState = {
      x: state.x,
      y: state.y + 1
    };
    break;

  case "d":
    newState = {
      x: state.x + 1,
      y: state.y
    };
    break;

  default:
    newState = state;
    break;

  }

  const newCell = getCell(newState, world);

  return (newCell === LAND) ? newState : state;
};

export default location;
