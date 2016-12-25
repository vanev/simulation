import { each, map } from 'lodash';

class List {

  constructor(items) {
    each(items, this.setItemToIndex.bind(this));
  }

  setItemToIndex(item, index) {
    this[index] = item;
  }

  map(fn) {
    return map(this, fn);
  }

}

export default List;
