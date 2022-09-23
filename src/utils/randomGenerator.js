const createArrayWithRandomNumbers = length => {
	let array = new Array(length).fill(null);
	array = array.map(() => Math.random());
	return array;
};

module.exports = {
	createArrayWithRandomNumbers,
};
