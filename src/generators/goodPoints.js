import { sortBy } from 'lodash/fp';

import generatePoints from './points';

import { improve } from '../utils/points';
import { getX } from '../utils/point';

// (Points) => Points
const sortPointsByX = sortBy(getX);

// (Points) => Points
const improvePointsOnce = improve(1);

// (Number, Extent) => Points
const generateGoodPoints = (numberOfPoints, extent) => {
  const points = generatePoints(numberOfPoints, extent);
  const sortedPoints = sortPointsByX(points);
  return improvePointsOnce(sortedPoints, extent);
};

export default generateGoodPoints;
