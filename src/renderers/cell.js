import { WATER, LAND } from '../cell/types';

const WIDTH = 15;
const HEIGHT = 15;

const TYPE_TO_COLOR_MAPPING = {
  [WATER]: "#04668A",
  [LAND]: "#119A2B"
};

// renderCell :: CanvasRenderingContext2D -> Number a -> Cell<String>, Number b -> _
const renderCell = (context) => (indexY) => (cell, indexX) => {
  const y = (indexY * HEIGHT);
  const x = (indexX * WIDTH);
  context.fillStyle = TYPE_TO_COLOR_MAPPING[cell];
  context.fillRect(x, y, WIDTH, HEIGHT);
};

export default renderCell;
