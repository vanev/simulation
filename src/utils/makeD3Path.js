import { path as d3_path } from 'd3';

const makeD3Path = (path) => {
  var p = d3_path();

  p.moveTo(1000*path[0][0], 1000*path[0][1]);

  for (var i = 1; i < path.length; i++) {
    p.lineTo(1000*path[i][0], 1000*path[i][1]);
  }

  return p.toString();
};

export default makeD3Path;
