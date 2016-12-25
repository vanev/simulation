import { isNearEdge } from '../utils/mesh';
import { neighbors } from '../utils/mesh';
import trislope from '../utils/trislope';
import randomNumber from '../utils/randomNumber';

const renderSlopes = (svg, h) => {
  var strokes = [];
  var r = 0.25 / Math.sqrt(h.length);

  for (var i = 0; i < h.length; i++) {
    if (h[i] <= 0 || isNearEdge(h.mesh, i)) continue;
    var nbs = neighbors(h.mesh, i);
    nbs.push(i);
    var s = 0;
    var s2 = 0;
    for (var j = 0; j < nbs.length; j++) {
      var slopes = trislope(h, nbs[j]);
      s += slopes[0] / 10;
      s2 += slopes[1];
    }
    s /= nbs.length;
    s2 /= nbs.length;
    if (Math.abs(s) < randomNumber(0.1, 0.4)) continue;
    var l = r * randomNumber(1, 2) * (1 - 0.2 * Math.pow(Math.atan(s), 2)) * Math.exp(s2/100);
    var x = h.mesh.verticies[i][0];
    var y = h.mesh.verticies[i][1];
    if (Math.abs(l*s) > 2 * r) {
      var n = Math.floor(Math.abs(l*s/r));
      l /= n;
      if (n > 4) n = 4;
      for (var j = 0; j < n; j++) {
        var u = randomNumber() * r;
        var v = randomNumber() * r;
        strokes.push([[x+u-l, y+v+l*s], [x+u+l, y+v-l*s]]);
      }
    } else {
      strokes.push([[x-l, y+l*s], [x+l, y-l*s]]);
    }
  }

  var lines = svg.selectAll('line.slope').data(strokes);

  lines
    .enter()
    .append('line')
    .classed('slope', true);

  lines
    .exit()
    .remove();

  svg.selectAll('line.slope')
    .attr('x1', (d) => 1000*d[0][0])
    .attr('y1', (d) => 1000*d[0][1])
    .attr('x2', (d) => 1000*d[1][0])
    .attr('y2', (d) => 1000*d[1][1])
};

export default renderSlopes;
