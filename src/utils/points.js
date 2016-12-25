import { map, reduce } from 'lodash/fp';

import Points from '../structs/Points';
import Point from '../structs/Point';

import generateVoronoi from '../generators/voronoi';

import { add } from './point';

//
// Points.sum
//
// (Points) => Point
export const sum = (points) => reduce(add, new Point(0, 0), points);

//
// Points.centroid
//
// (Points) => Point
export const centroid = (points) => {
  const total = sum(points);
  return new Point(
    total[0] / points.length,
    total[1] / points.length
  );
};

//
// Points.improve
//
// (Number) => (Points, Extent) => Points
export const improve = (count) => (points, extent) => {
  const voronoi = generateVoronoi(points, extent);
  const polygons = voronoi.polygons(points);
  const improvedPoints = new Points(map(centroid, polygons));
  return (count - 1) ? improve(count - 1)(improvedPoints, extent) : improvedPoints;
};
