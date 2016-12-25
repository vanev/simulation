import { map, times, reduce } from 'lodash/fp';

import Heightmap from '../structs/Heightmap';


//
// generateHeightmap
//
// (Function) => (Mesh) => Heightmap
const heightmap = (fn) => (mesh) => {
  const heights = map(fn, mesh.verticies);
  return new Heightmap(heights, mesh);
};


//
// zero
//
// () => Number
const zero = () => 0;

//
// generateZeroHeightmap
//
// (Mesh) => Heightmap
export const zeroHeightmap = heightmap(zero);


// (Vector) => (Point) => Number
const slopeAtPoint = (vector) => (point) =>
  point[0] * vector[0] + point[1] * vector[1];

//
// generateSlopeHeightmap
//
// (Vector) => (Mesh) => Heightmap
export const slopeHeightmap = (vector) => heightmap(slopeAtPoint(vector));


// (Number) => (Point) => Number
const coneAtPoint = (num) => (point) =>
  Math.pow(point[0] * point[0] + point[1] * point[1], 0.5) * num;

//
// generateConeHeightmap
//
// (Number) => (Mesh) => Heightmap
export const coneHeightmap = (num) => heightmap(coneAtPoint(num));


// (Number, Mountain) => Number
const mountainAtPoint = (radius, point) => (height, mountain) => {
  const u = (point[0] - mountain[0]) * (point[0] - mountain[0]);
  const v = (point[1] - mountain[1]) * (point[1] - mountain[1]);
  const w = -(u + v);
  const x = w / (2 * radius * radius);
  const y = Math.exp(x);
  const z = Math.pow(y, 2);
  return height + z;
};

// (List, Number) => (Point) => Number
const mountainsAtPoint = (mountains, radius) => (point) =>
  reduce(mountainAtPoint(radius, point), 0, mountains);

//
// generateMountainsHeightmap
//
// (Number, Number) => (Mesh) => Heightmap
export const mountainsHeightmap = (count, radius = 0.05) => (mesh) => {
  const mountains = times(() => [
    mesh.extent.width * (Math.random() - 0.5),
    mesh.extent.height * (Math.random() - 0.5)
  ], count);
  return heightmap(mountainsAtPoint(mountains, radius))(mesh);
};
