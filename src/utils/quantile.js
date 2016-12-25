import { ascending, quantile as d3_quantile } from 'd3';

const quantile = (h, q) => {
  var sortedh = [];
  for (var i = 0; i < h.length; i++) {
      sortedh[i] = h[i];
  }
  sortedh.sort(ascending);
  return d3_quantile(sortedh, q);
};

export default quantile;
