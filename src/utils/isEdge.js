const isEdge = (mesh, i) => (mesh.adjoiningVerticies[i].length < 3);

export default isEdge;
