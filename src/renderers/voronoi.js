import { max, min, interpolateViridis } from 'd3';
import makeD3Path from '../utils/makeD3Path';

const renderVoronoi = (svg, field, low, high) => {
  if (high === undefined) high = max(field) + 1e-9;
  if (low === undefined) low = min(field) - 1e-9;

  var mappedValues = field.map((x) => {
    if (x > high) return 1;
    if (x < low) return 0;
    return (x - low) / (high - low);
  });

  var triangles = svg.selectAll('path.field').data(field.mesh.triangles);

  triangles
    .enter()
    .append('path')
    .classed('field', true);

  triangles
    .exit()
    .remove();

  svg.selectAll('path.field')
    .attr('d', makeD3Path)
    .style('fill', (d, i) => interpolateViridis(mappedValues[i]));
};

export default renderVoronoi;
