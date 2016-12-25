import { neighbors } from './mesh';

const trislope = (h, i) => {
  var nbs = neighbors(h.mesh, i);
  if (nbs.length != 3) return [0,0];
  var p0 = h.mesh.verticies[nbs[0]];
  var p1 = h.mesh.verticies[nbs[1]];
  var p2 = h.mesh.verticies[nbs[2]];

  var x1 = p1[0] - p0[0];
  var x2 = p2[0] - p0[0];
  var y1 = p1[1] - p0[1];
  var y2 = p2[1] - p0[1];

  var det = x1 * y2 - x2 * y1;
  var h1 = h[nbs[1]] - h[nbs[0]];
  var h2 = h[nbs[2]] - h[nbs[0]];

  return [
    (y2 * h1 - y1 * h2) / det,
    (-x2 * h1 + x1 * h2) / det
  ];
};

export default trislope;
