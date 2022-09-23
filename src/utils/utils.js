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

module.exports = {
	createArrayWithRandomNumbers,
	getAdditions,
};
