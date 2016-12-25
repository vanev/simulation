import { times } from 'lodash';

import Points from '../structs/Points';

import generatePoint from './point';

const generatePoints = (count, extent) => new Points(
  times(count, generatePoint(extent))
);

export default generatePoints;
