import { select } from 'd3';

import Extent from './structs/Extent';

import generateGoodPoints from './generators/goodPoints';
import generateVoronoi from './generators/voronoi';
import generateMesh from './generators/mesh';
import {
  slopeHeightmap as generateSlopeHeightmap,
  coneHeightmap as generateConeHeightmap,
  mountainsHeightmap as generateMountainsHeightmap
} from './generators/heightmap';

import renderPaths from './renderers/Paths';
import renderSlopes from './renderers/Slopes';

import { sum } from './utils/heightmaps';
import { relax, peaky, fillSinks, doErosion } from './utils/heightmap';

import contour from './utils/contour';
import randomVector from './utils/randomVector';
import randomNumber from './utils/randomNumber';
import setSeaLevel from './utils/setSeaLevel';
import cleanCoast from './utils/cleanCoast';
import getRivers from './utils/getRivers';

const POINTS_COUNT = 4096;

const extent = new Extent(1, 1);

const points = generateGoodPoints(POINTS_COUNT, extent);

const voronoi = generateVoronoi(points, extent);

const mesh = generateMesh(points, extent, voronoi);

const slopedHeightmap = generateSlopeHeightmap(randomVector(4))(mesh);
const conedHeightmap = generateConeHeightmap(randomNumber(1, -1))(mesh);
const mountainedHeightmap = generateMountainsHeightmap(50)(mesh);

let heightmap = sum([
  slopedHeightmap,
  conedHeightmap,
  mountainedHeightmap
]);

heightmap = relax(10)(heightmap);

heightmap = peaky(heightmap);
heightmap = doErosion(heightmap, randomNumber(0, 0.1), 5);
heightmap = setSeaLevel(heightmap, randomNumber(0.2, 0.6));
heightmap = fillSinks()(heightmap);
heightmap = cleanCoast(heightmap, 3);

const mapSvg = select('#map');

mapSvg
  .attr('height', 500)
  .attr('width', 500)
  .attr('viewBox', '-500 -500 1000 1000');

renderPaths(mapSvg, 'coast', contour(heightmap, 0));
renderPaths(mapSvg, 'river', getRivers(heightmap, 0.01));
renderSlopes(mapSvg, heightmap);
