import Point from '../structs/Point';

//
// Point.getX
//
// (Point) => Number
export const getX = (point) => point[0];

//
// Point.getY
//
// (Point) => Number
export const getY = (point) => point[1];

//
// Point.add
//
// (Point, Point) => Point
export const add = (pointA, pointB) => new Point(
  pointA[0] + pointB[0],
  pointA[1] + pointB[1]
);
