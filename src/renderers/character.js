const WIDTH = 15;
const HEIGHT = 15;

// renderCharacter :: CanvasRenderingContext2D -> Character<Map> -> _
const renderCharacter = (context) => ({ location }) => {
  const x = location.x * WIDTH;
  const y = location.y * HEIGHT;
  context.fillStyle = "black";
  context.fillRect(x, y, WIDTH, HEIGHT);
};

export default renderCharacter;
