import isEdge from './isEdge';
import { neighbors } from './mesh';

const downhill = (h) => {
  if (h.downhill) return h.downhill;
  function downFrom(i) {
    if (isEdge(h.mesh, i)) return -2;
    var best = -1;
    var besth = h[i];
    var nbs = neighbors(h.mesh, i);
    for (var j = 0; j < nbs.length; j++) {
      if (h[nbs[j]] < besth) {
        besth = h[nbs[j]];
        best = nbs[j];
      }
    }
    return best;
  }
  var downs = [];
  for (var i = 0; i < h.length; i++) {
    downs[i] = downFrom(i);
  }
  h.downhill = downs;
  return downs;
};

export default downhill;
