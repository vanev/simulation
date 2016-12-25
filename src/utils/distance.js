const distance = (mesh, i, j) => {
  var p = mesh.verticies[i];
  var q = mesh.verticies[j];
  return Math.sqrt((p[0] - q[0]) * (p[0] - q[0]) + (p[1] - q[1]) * (p[1] - q[1]));
};

export default distance;
