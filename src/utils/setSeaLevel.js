import zero from './zero';
import quantile from './quantile';

const setSeaLevel = (heightmap, q) => {
  var newHeightmap = zero(heightmap.mesh);
  var delta = quantile(heightmap, q);
  for (var i = 0; i < heightmap.length; i++) {
      newHeightmap[i] = heightmap[i] - delta;
  }
  return newHeightmap;
};

export default setSeaLevel;
