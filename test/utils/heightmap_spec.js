/* globals describe:false, it:false */

import expect from 'expect';
import Heightmap from '../../src/structs/Heightmap';
import { map, add, relax, normalize, peaky, fillSinks } from '../../src/utils/heightmap';

describe('map', () => {
  it('returns a new Heightmap, with the function applied', () => {
    const fn = (height, index) => index * 2;
    const heightmap = new Heightmap([1, 1, 1, 1]);
    const expectedHeightmap = new Heightmap([0, 2, 4, 6]);
    expect(map(fn)(heightmap)).toEqual(expectedHeightmap);
  });
});

describe('add', () => {
  it('adds two heightmaps', () => {
    const heightmapA = new Heightmap([1, 1, 1, 1]);
    const heightmapB = new Heightmap([0, 1, 2, 3]);
    const expectedHeightmap = new Heightmap([1, 2, 3, 4]);
    expect(add(heightmapA, heightmapB)).toEqual(expectedHeightmap);
  });
});

describe('relax', () => {
  it('returns the mean of the neighbors of the given point', () => {
    const mesh = { adjoiningVerticies: [[1], [0, 2, 3], [1], [1]] };
    const heightmap = new Heightmap([5, 10, 4, 6], mesh);
    const expectedHeightmap = new Heightmap([0, 5, 0, 0], mesh);
    expect(relax(1)(heightmap)).toEqual(expectedHeightmap);
  });
});

describe('normalize', () => {
  it('returns a heightmap with every value between 0 and 1', () => {
    const heightmap = new Heightmap([1, 2, 3, 4, 5]);
    const expectedHeightmap = new Heightmap([0, 0.25, 0.5, 0.75, 1]);
    expect(normalize(heightmap)).toEqual(expectedHeightmap);
  });
});

describe('peaky', () => {
  it('returns a heightmap with', () => {
    const heightmap = new Heightmap([1, 2, 3, 4, 5]);
    const expectedHeightmap = new Heightmap([0, 0.5, 0.7071067811865476, 0.8660254037844386, 1]);
    expect(peaky(heightmap)).toEqual(expectedHeightmap);
  });
});

// TODO: I really have no idea what's going on here.
describe('fillSinks', () => {
  it('returns a heightmap with sinks filled', () => {
    const mesh = {
      verticies: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 0]
      ],
      extent: {
        width: 1,
        height: 1
      }
    };
    const heightmap = new Heightmap([1, 1, 1, 1, 1], mesh);
    const expectedHeightmap = new Heightmap([1, 1, 1, 1, 1], mesh);
    expect(fillSinks(1e-5)(heightmap)).toEqual(expectedHeightmap);
  });
});
