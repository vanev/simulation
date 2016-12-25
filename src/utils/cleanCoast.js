import zero from './zero';
import { neighbors } from './mesh';

const cleanCoast = (h, iters) => {
  for (var iter = 0; iter < iters; iter++) {
    var changed = 0;
    var newh = zero(h.mesh);
    for (var i = 0; i < h.length; i++) {
      newh[i] = h[i];
      var nbs = neighbors(h.mesh, i);
      if (h[i] <= 0 || nbs.length != 3) continue;
      var count = 0;
      var best = -999999;
      for (var j = 0; j < nbs.length; j++) {
        if (h[nbs[j]] > 0) {
          count++;
        } else if (h[nbs[j]] > best) {
          best = h[nbs[j]];
        }
      }
      if (count > 1) continue;
      newh[i] = best / 2;
      changed++;
    }
    h = newh;
    newh = zero(h.mesh);
    for (var i = 0; i < h.length; i++) {
      newh[i] = h[i];
      var nbs = neighbors(h.mesh, i);
      if (h[i] > 0 || nbs.length != 3) continue;
      var count = 0;
      var best = 999999;
      for (var j = 0; j < nbs.length; j++) {
        if (h[nbs[j]] <= 0) {
          count++;
        } else if (h[nbs[j]] < best) {
          best = h[nbs[j]];
        }
      }
      if (count > 1) continue;
      newh[i] = best / 2;
      changed++;
    }
    h = newh;
  }
  return h;
};

export default cleanCoast;
