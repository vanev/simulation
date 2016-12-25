import downhill from './downhill';
import getFlux from './getFlux';
import { isNearEdge } from './mesh';
import mergeSegments from './mergeSegments';
import relaxPath from './relaxPath';

const getRivers = (h, limit) => {
  var dh = downhill(h);
  var flux = getFlux(h);
  var links = [];
  var above = 0;
  for (var i = 0; i < h.length; i++) {
    if (h[i] > 0) above++;
  }
  limit *= above / h.length;
  for (var i = 0; i < dh.length; i++) {
    if (isNearEdge(h.mesh, i)) continue;
    if (flux[i] > limit && h[i] > 0 && dh[i] >= 0) {
      var up = h.mesh.verticies[i];
      var down = h.mesh.verticies[dh[i]];
      if (h[dh[i]] > 0) {
        links.push([up, down]);
      } else {
        links.push([up, [(up[0] + down[0])/2, (up[1] + down[1])/2]]);
      }
    }
  }
  return mergeSegments(links).map(relaxPath);
};

export default getRivers;
