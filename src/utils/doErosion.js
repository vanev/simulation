import { fillSinks } from './heightmap';
import erode from './erode';

const doErosion = (h, amount, n=1) => {
  h = fillSinks()(h);

  for (var i = 0; i < n; i++) {
    h = erode(h, amount);
    h = fillSinks()(h);
  }

  return h;
};

export default doErosion;
