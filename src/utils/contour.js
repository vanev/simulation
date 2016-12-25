import { isNearEdge } from './mesh';
import mergeSegments from './mergeSegments';

const contour = (h, level) => {
  var edges = [];
  for (var i = 0; i < h.mesh.edges.length; i++) {
    var e = h.mesh.edges[i];
    if (e[3] == undefined) continue;
    if (isNearEdge(h.mesh, e[0]) || isNearEdge(h.mesh, e[1])) continue;
    if ((h[e[0]] > level && h[e[1]] <= level) ||
      (h[e[1]] > level && h[e[0]] <= level)) {
      edges.push([e[2], e[3]]);
    }
  }
  return mergeSegments(edges);
}

export default contour;
