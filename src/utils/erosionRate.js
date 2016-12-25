import getFlux from './getFlux';
import getSlope from './getSlope';
import zero from './zero';

const erosionRate = (h) => {
  var flux = getFlux(h);
  var slope = getSlope(h);
  var newh = zero(h.mesh);
  for (var i = 0; i < h.length; i++) {
    var river = Math.sqrt(flux[i]) * slope[i];
    var creep = slope[i] * slope[i];
    var total = 1000 * river + creep;
    total = total > 200 ? 200 : total;
    newh[i] = total;
  }
  return newh;
};

export default erosionRate;
