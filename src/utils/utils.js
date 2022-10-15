const createArrayWithRandomNumbers = length => {
	let array = new Array(length).fill(null);
	array = array.map(() => Math.random());
	return array;
};

const getAdditions = () => [
	{w: -1, h: -1},
	{w: -1, h: 0},
	{w: 0, h: -1},
	{w: 0, h: 1},
	{w: 1, h: 0},
	{w: 1, h: 1},
	{w: -1, h: 1},
	{w: 1, h: -1},
];


const isCoordinateInRange = ({field, row, column}) => {
	const fieldWidthLimit = field.length;
	const fieldHeightLimit = field[0].length;
	return row >= 0 && row < fieldWidthLimit && column >= 0 && column < fieldHeightLimit;
};

module.exports = {
	createArrayWithRandomNumbers,
	getAdditions,
	isCoordinateInRange,
};
