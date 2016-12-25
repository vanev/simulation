// getCell :: Coordinates, [[Cell]] -> Cell
const getCell = ({ x, y }, world) => world[y][x];

export default getCell;
