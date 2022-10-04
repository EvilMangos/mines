const {fieldInputData} = require('../schemes/components/field');

const defaultMinesPercentage = 0.2;

class ValidateService {
	validatePlayAreaInputData({width, height, minesCount}) {
		const {error} = fieldInputData.validate({width, height, minesCount});
		if (error) {
			throw new Error(error);
		}

		if (!(this.isValidSize(width) && this.isValidSize(height))) {
			throw new Error('Wrong size');
		}

		if (!this.isValidMinesCount({width, height, minesCount})) {
			minesCount = this.setDefaultMinesCount({width, height});
		}

		return {width, height, minesCount};
	}

	isValidSize(size) {
		return size && typeof size === 'number' && size > 2;
	}

	isValidMinesCount({width, height, minesCount}) {
		const cellsCount = height * width;
		return minesCount && typeof minesCount === 'number' && minesCount > 0 && minesCount < cellsCount;
	}

	setDefaultMinesCount({width, height}) {
		return Math.round(width * height * defaultMinesPercentage);
	}
}

module.exports = ValidateService;
