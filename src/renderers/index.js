import renderWorld from './world';
import renderCharacter from './character';

// index :: CanvasRenderingContext2D -> State -> _
const index = (context) => ({ world, playerCharacter }) => {
  renderWorld(context)(world);
  renderCharacter(context)(playerCharacter);
};

export default index;
