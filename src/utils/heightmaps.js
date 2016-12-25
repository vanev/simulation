import { reduce, head } from 'lodash/fp';

import { zeroHeightmap } from '../generators/heightmap';

import { add } from './heightmap';

//
// Heightmaps.sum
//
// (Heightmaps) => Heightmap
export const sum = (heightmaps) => {
  const { mesh } = head(heightmaps);
  const baseHeightmap = zeroHeightmap(mesh);
  return reduce(add, baseHeightmap, heightmaps);
};
