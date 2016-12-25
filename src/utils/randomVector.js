import randomNumber from './randomNumber';

const randomVector = (scale) => [scale * randomNumber(1, -1), scale * randomNumber(1, -1)];

export default randomVector;
