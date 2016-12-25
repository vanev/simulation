const mergeSegments = (segs) => {
  var adj = {};
  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];
    var a0 = adj[seg[0]] || [];
    var a1 = adj[seg[1]] || [];
    a0.push(seg[1]);
    a1.push(seg[0]);
    adj[seg[0]] = a0;
    adj[seg[1]] = a1;
  }
  var done = [];
  var paths = [];
  var path = null;
  while (true) {
    if (path == null) {
      for (var i = 0; i < segs.length; i++) {
        if (done[i]) continue;
        done[i] = true;
        path = [segs[i][0], segs[i][1]];
        break;
      }
      if (path == null) break;
    }
    var changed = false;
    for (var i = 0; i < segs.length; i++) {
      if (done[i]) continue;
      if (adj[path[0]].length == 2 && segs[i][0] == path[0]) {
        path.unshift(segs[i][1]);
      } else if (adj[path[0]].length == 2 && segs[i][1] == path[0]) {
        path.unshift(segs[i][0]);
      } else if (adj[path[path.length - 1]].length == 2 && segs[i][0] == path[path.length - 1]) {
        path.push(segs[i][1]);
      } else if (adj[path[path.length - 1]].length == 2 && segs[i][1] == path[path.length - 1]) {
        path.push(segs[i][0]);
      } else {
        continue;
      }
      done[i] = true;
      changed = true;
      break;
    }
    if (!changed) {
      paths.push(path);
      path = null;
    }
  }
  return paths;
};

export default mergeSegments;
