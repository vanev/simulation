import { max } from 'd3';

import zero from './zero';
import erosionRate from './erosionRate';

const erode = (h, amount) => {
  var er = erosionRate(h);
  var newh = zero(h.mesh);
  var maxr = max(er);
  for (var i = 0; i < h.length; i++) {
    newh[i] = h[i] - amount * (er[i] / maxr);
  }
  return newh;
};

export default erode;
