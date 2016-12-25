const relaxPath = (path) => {
  var newpath = [path[0]];
  for (var i = 1; i < path.length - 1; i++) {
    var newpt = [
      0.25 * path[i-1][0] + 0.5 * path[i][0] + 0.25 * path[i+1][0],
      0.25 * path[i-1][1] + 0.5 * path[i][1] + 0.25 * path[i+1][1]
    ];
    newpath.push(newpt);
  }
  newpath.push(path[path.length - 1]);
  return newpath;
};

export default relaxPath;
