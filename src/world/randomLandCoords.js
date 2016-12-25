import { random } from 'lodash/fp';
import getCell from './getCell';
import { LAND } from '../cell/types';

const randomLandCoords = (mesh) => {
  const { width, height, cells } = mesh;
  const coords = [random(0, width-1), random(0, height-1)];
  const cell = getCell(coords, mesh);
  return (cell === LAND) ? coords : randomLandCoords(mesh);
};

export default randomLandCoords;
