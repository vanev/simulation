import renderWorld from './world';

// index :: CanvasRenderingContext2D -> State -> _
const index = (context) => ({ world }) => {
  renderWorld(context)(world);
};

export default index;
