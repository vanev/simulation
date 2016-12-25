import { times } from 'lodash';

// The mesh is actually a thing behind the scenes. For the most part, we're working with a heighmap. This generates that heighmap, with all values set to zero (sea level). We use it all over the place because we actually want to be showing the heightmap, in most places.

// (Mesh) => Heightmap
const zero = (mesh) => {
  const z = times(mesh.verticies.length, () => 0);
  z.mesh = mesh;
  return z;
};

export default zero;
