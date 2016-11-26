import { flow, map, split, trim } from 'lodash/fp';

// createFromTemplate :: Template<String> -> [[Cell<String>]<List>]<List>
const createFromTemplate = flow(
  trim,
  split('\n'),
  map(trim),
  map(split(''))
);

export default createFromTemplate;
