import { selectAll } from 'd3';

const CIRCLE_TAG = 'circle';
const POINT_CLASS_NAME = 'point';

const renderPoints = (svg, points) => {
  const circle = svg.selectAll(`${CIRCLE_TAG}.${POINT_CLASS_NAME}`).data(points);

  circle
    .enter()
    .append(CIRCLE_TAG)
    .classed(POINT_CLASS_NAME, true);

  circle
    .exit()
    .remove();

  selectAll(`${CIRCLE_TAG}.${POINT_CLASS_NAME}`)
    .attr('cx', (d) => 1000 * d[0])
    .attr('cy', (d) => 1000 * d[1])
    .attr('r', 100 / Math.sqrt(points.length));
};

export default renderPoints;
