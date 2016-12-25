import downhill from './downhill';
import zero from './zero';
import trislope from './trislope';
import distance from './distance';

const getSlope = (h) => {
  var dh = downhill(h);
  var slope = zero(h.mesh);
  for (var i = 0; i < h.length; i++) {
    var s = trislope(h, i);
    slope[i] = Math.sqrt(s[0] * s[0] + s[1] * s[1]);
    continue;
    if (dh[i] < 0) {
      slope[i] = 0;
    } else {
      slope[i] = (h[i] - h[dh[i]]) / distance(h.mesh, i, dh[i]);
    }
  }
  return slope;
};

export default getSlope;
