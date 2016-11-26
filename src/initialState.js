import template from './template.js';
import createWorldFromTemplate from './world/createFromTemplate';

const initialState = {
  world: createWorldFromTemplate(template)
};

export default initialState;
