import downhill from './downhill';
import zero from './zero';

const getFlux = (h) => {
  var dh = downhill(h);
  var idxs = [];
  var flux = zero(h.mesh);
  for (var i = 0; i < h.length; i++) {
    idxs[i] = i;
    flux[i] = 1/h.length;
  }
  idxs.sort(function (a, b) {
    return h[b] - h[a];
  });
  for (var i = 0; i < h.length; i++) {
    var j = idxs[i];
    if (dh[j] >= 0) {
      flux[dh[j]] += flux[j];
    }
  }
  return flux;
};

export default getFlux;
