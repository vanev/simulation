import { each } from 'lodash/fp';

import renderCell from './cell';

const eachWithIndex = each.convert({ cap: false });

// renderRow :: CanvasRenderingContext2D -> [Cell], Number a -> [Cell]
const renderRow = (context) => (row, indexY) => eachWithIndex(renderCell(context)(indexY), row);

// renderWorld :: CanvasRenderingContext2D -> [[Cell]] -> [[Cell]]
const renderWorld = (context) => (world) => eachWithIndex(renderRow(context), world);

export default renderWorld;
