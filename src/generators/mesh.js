import { each } from 'lodash';

// (Points, Extent, d3.Diagram) => Mesh
const generateMesh = (points, extent, voronoi) => {
  // verticies is going to be a list of Points.
  const verticies = [];
  // vertexIndiciesByValue is going to be an object where the key is the values of the vertex and the value is the index of the vertex in the verticies list.
  // This is only used in this function.
  const vertexIndiciesByValue = {};
  // adjoiningVerticies is a list of lists of indexes who's points are connected (adjacent).
  const adjoiningVerticies = [];
  // edges is a list of lists of each edge in the voronoi graph when the first two elements in the list are the indexes of the verticies and the second two elements are the actual points.
  // TODO: I'm really not sure if this is correct. Ideally, when I look at the contour code it will become more clear.
  const edges = [];
  // triangles is a list of lists of points that make up triangles? Some of these only have two points. That does not make a triangle... Maybe those are on the edges of the graph?
  const triangles = [];

  each(voronoi.edges, (edge) => {
    // An edge is a line between two points, definied by those points. Edges also have a left and right, which are sites.
    // Sites are points that are to the left and the right of an edge.

    // TODO: When is an edge undefined? When it's actually on the edge of the diagram?
    if (!edge) return;

    // Edge[0] is a point. In vertexIndiciesByValue we store the index of the point (from verticies) at the stringified value of the point.
    // So, edge0Id is the id of a point in the verticies list.
    let edge0Id = vertexIndiciesByValue[edge[0]];
    let edge1Id = vertexIndiciesByValue[edge[1]];

    // If the edgeId doesn't exist, it means that the edgePoint is not in the list of verticies.
    if (!edge0Id) {
      // Set the edgeId to the length of the verticies array, because we are inserting the vertex at the end.
      edge0Id = verticies.length;
      // Store the edgeId in an object at the value of the edgePoint.
      // The only reason why we do this is to have easy access to the index, later. Maybe we can look it up using indexOf, instead of maintaining this gross object?
      vertexIndiciesByValue[edge[0]] = edge0Id;
      // Add the edgePoint to the verticies list (which will be at the edgeId index);
      verticies.push(edge[0]);
    }

    // Same exact thing as above, just with the other point of the edge.
    if (!edge1Id) {
      edge1Id = verticies.length;
      vertexIndiciesByValue[edge[1]] = edge1Id;
      verticies.push(edge[1]);
    }

    // Here we make a list of all of the points that share an edge with each edgePoint.
    const adjoiningVertex0 = adjoiningVerticies[edge0Id] || [];
    adjoiningVertex0.push(edge1Id);
    adjoiningVerticies[edge0Id] = adjoiningVertex0;

    const adjoiningVertex1 = adjoiningVerticies[edge1Id] || [];
    adjoiningVertex1.push(edge0Id);
    adjoiningVerticies[edge1Id] = adjoiningVertex1;

    // Here we make our own list of edges. Instead of using the actual points, we use the index of the points in the verticies array.
    // For the left and right sites, we still use the left and right site points, not references.
    edges.push([edge0Id, edge1Id, edge.left, edge.right]);

    // For each edgeId, we add the left and right sites to an array, as long as they exist.
    // I'm still not totally sure how this plays out.
    const triangle0 = triangles[edge0Id] || [];
    if (!triangle0.includes(edge.left)) triangle0.push(edge.left);
    // I suppose sometimes you might not have a 'right', if the edge is literally the edge of the graph.
    if (edge.right && !triangle0.includes(edge.right)) triangle0.push(edge.right);
    // Again, we're storing these triangles at the same index as the edge is stored in the list of verticies.
    triangles[edge0Id] = triangle0;

    const triangle1 = triangles[edge1Id] || [];
    if (!triangle1.includes(edge.left)) triangle1.push(edge.left);
    if (edge.right && !triangle1.includes(edge.right)) triangle1.push(edge.right);
    triangles[edge1Id] = triangle1;
  });

  const mesh = {
    points,
    voronoi,
    verticies,
    vertexIndiciesByValue,
    adjoiningVerticies,
    triangles,
    edges,
    extent
  };

  // This actually converts a mesh into a heightmap... sneaky sneaky.
  mesh.map = (fn) => {
    const mapped = verticies.map(fn);
    mapped.mesh = mesh;
    return mapped;
  };

  return mesh;
};

export default generateMesh;
