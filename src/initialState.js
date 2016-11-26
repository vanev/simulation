import template from './template.js';
import createWorldFromTemplate from './world/createFromTemplate';
import createCharacter from './character/create';

const initialState = {
  world: createWorldFromTemplate(template),
  playerCharacter: createCharacter({ x: 5, y: 5 }),
  ticking: false
};

export default initialState;
