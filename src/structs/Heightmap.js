import List from './List';

class Heightmap extends List {

  constructor(heights, mesh) {
    super(heights);
    this.mesh = mesh;
    this.length = heights.length;
  }

}

export default Heightmap;
