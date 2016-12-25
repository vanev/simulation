import { map as _map, each } from 'lodash';
import { mean, min, max } from 'd3';

import Heightmap from '../structs/Heightmap';

import { neighbors, isNearEdge } from './mesh';

//
// Heightmap.map
//
// (Heightmap, Function) => Heightmap
export const map = (fn) => (heightmap) => {
  const { mesh } = heightmap;
  const heights = _map(heightmap, fn);
  return new Heightmap(heights, mesh);
};

//
// Heightmap.add
//
// (Heightmap, Heightmap) => Heightmap
export const add = (heightmapA, heightmapB) => {
  if (heightmapA.mesh !== heightmapB.mesh) throw new Error('Heightmaps must be based on the same mesh.');
  return map((height, index) => height + heightmapB[index])(heightmapA);
};

// (Heightmap) => (Number, Number) => Number
const relaxPoint = (heightmap) => (height, index) => {
  let nbs = neighbors(heightmap.mesh, index);
  if (nbs.length < 3) return 0;
  return mean(_map(nbs, (nb) => heightmap[nb]));
};

//
// Heightmap.relax
//
// (Number) => (Heightmap) => Heightmap
export const relax = (count) => (heightmap) => {
  const newHeightmap = map(relaxPoint(heightmap))(heightmap);
  return (count - 1) ? relax(count - 1)(newHeightmap) : newHeightmap;
};

//
// Heightmap.normalize
//
// (Heightmap) => Heightmap
export const normalize = (heightmap) => {
  const low = min(heightmap);
  const high = max(heightmap);
  return map((x) => (x - low) / (high - low))(heightmap);
};

//
// Heightmap.peaky
//
// (Heightmap) => Heightmap
export const peaky = (heightmap) => map(Math.sqrt)(normalize(heightmap));

// (Mesh, Number) => (Number, Number) => Number
const heightByLocation = (mesh, defaultValue = Infinity) => (height, index) =>
  isNearEdge(mesh, index) ? height : defaultValue;

//
// Heightmap.fillSinks
//
// (Number) => (Heightmap) => Heightmap
export const fillSinks = (epsilon = 1e-5) => (heightmap) => {
  const { mesh } = heightmap;

  let newHeightmap = map(heightByLocation(mesh))(heightmap);

  let changed = false;
  while (!changed)
    newHeightmap = map((height, index) => {
      if (height === newHeightmap[index]) return height;

      const nbs = neighbors(mesh, index);

      let newHeight = height;
      each(nbs, (nb) => {
        const nbHeight = newHeightmap[nb] + epsilon;
        if (height >= nbHeight) {
          changed = true;
          newHeight = height;
        } else if (newHeightmap[index] > nbHeight && nbHeight > height) {
          changed = true;
          newHeight = nbHeight;
        }
      });

      return newHeight;
    })(heightmap);


  return newHeightmap;
};

//
// Heightmap.getFlux
//
// (Heightmap) => Heightmap
export const getFlux = (heightmap) => {};

//
// Heightmap.getSlope
//
// (Heightmap) => Heightmap
export const getSlope = (heightmap) => {};

// (Heightmap, Heightmap) => (Heightmap) => Heightmap
const erosionRatesByFluxAndSlope = (flux, slope) => (height, index) => {
  const river = Math.sqrt(flux[index]) * slope[index];
  const creep = slope[index] * slope[index];
  const total = 1000 * river + creep;
  return (total > 200) ? 200 : total;
};

//
// Heightmap.erosionRate
//
// (Heightmap) => Heightmap
export const erosionRate = (heightmap) => {
  const flux = getFlux(heightmap);
  const slope = getSlope(heightmap);
  return map(erosionRatesByFluxAndSlope(flux, slope))(heightmap);
};

// (Number, Array, Number) => (Number, Number) => Number
const heightByErosionRate = (amount, rates, maxRate) => (height, index) =>
  height - amount * (rates[index] / maxRate);

//
// Heightmap.erode
//
// (Number) => (Heightmap) => Heightmap
export const erode = (amount) => (heightmap) => {
  const erosionRates = erosionRate(heightmap);
  const maxRate = max(erosionRates);
  return map(heightByErosionRate(amount, erosionRates, maxRate))(heightmap);
};

//
// Heightmap.doErosion
//
// (Number, Number) => (Heightmap) => Heightmap
export const doErosion = (amount, count = 1) => (heightmap) => {
  let newHeightmap = fillSinks(heightmap);
  newHeightmap = erode(heightmap, amount);

  if (count - 1) return doErosion(amount, count - 1)(newHeightmap);

  return fillSinks(newHeightmap);
};
