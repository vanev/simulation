import { map } from 'lodash/fp';

// (Any) => Any
const identity = (x) => x;

// ([Any]) => Any
const identities = map(identity);

//
// Mesh.neighbors
//
// (Mesh, Number) => [Number]
export const neighbors = ({ adjoiningVerticies }, index) =>
  identities(adjoiningVerticies[index]);

//
// Mesh.isNearEdge
//
// (Mesh, Number) => Boolean
export const isNearEdge = ({ verticies, extent }, index) => {
  const x = verticies[index][0];
  const y = verticies[index][1];
  const w = extent.width;
  const h = extent.height;
  return x < -0.45 * w || x > 0.45 * w || y < -0.45 * h || y > 0.45 * h;
};
