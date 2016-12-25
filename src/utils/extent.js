// (Extent) => d3.Extent
export const convertToD3Extent = (extent) => {
  const w = extent.width / 2;
  const h = extent.height / 2;

  // The extent bounds are specified as an array [​[x0, y0], [x1, y1]​], where x0
  // is the left side of the extent, y0 is the top, x1 is the right and y1 is
  // the bottom.
  return [[-w, -h], [w, h]];
};
