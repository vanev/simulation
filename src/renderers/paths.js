import makeD3Path from '../utils/makeD3Path';

const PATH_TAG = 'path';
const DATA_ATTR = 'd';

const renderPaths = (svg, className, data) => {
  const paths = svg.selectAll(`${PATH_TAG}.${className}`).data(data);

  paths
    .enter()
    .append(PATH_TAG)
    .classed(className, true);

  paths
    .exit()
    .remove();

  svg.selectAll(`${PATH_TAG}.${className}`)
    .attr(DATA_ATTR, makeD3Path);
};

export default renderPaths;
