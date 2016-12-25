import { voronoi } from 'd3';

import { convertToD3Extent } from '../utils/extent';

// (Points, Extent) => d3.Diagram
const generateVoronoi = (points, extent) =>
  voronoi().extent(convertToD3Extent(extent))(points);

export default generateVoronoi;
