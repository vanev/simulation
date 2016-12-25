import Point from '../structs/Point';

// (Number) => Number
// TODO: Why do we use 0.5? What does this number mean?
const randomCoordinate = (number) => (Math.random() - 0.5) * number;

// (Extent) => Point
const generatePoint = ({ width, height }) => () => new Point(
  randomCoordinate(width),
  randomCoordinate(height)
);

export default generatePoint;
