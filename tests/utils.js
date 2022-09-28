const {getAdditions, isCoordinateInRange} = require('../src/utils/utils');
const isValidDataSchema = (data, schema) => {
	const {error} = schema.validate(data);
	return !error;
};

const checkNumbersInField = field => {
	for (let row = 0; row < field.length; row++) {
		for (let column = 0; column < field[0].length; column++) {
			const value = countMinesAround({field, row, column});
			if (field[row][column].value !== value) {
				return false;
			}
		}
	}

	return true;
};

const countMinesAround = ({field, row, column}) => {
	if (field[row][column].isMine) {
		return 0;
	}

	let value = 0;
	getAdditions().forEach(({w, h}) => {
		const newRow = row + h;
		const newColumn = column + w;
		if (
			isCoordinateInRange({field, row: newRow, column: newColumn})
			&& field[newRow][newColumn].isMine
		) {
			value++;
		}
	});

	return value;
};

module.exports = {
	isValidDataSchema,
	checkNumbersInField,
};
