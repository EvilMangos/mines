const Redis = require('./redis');
const ContentCreator = require('./contentCreator');
const {fieldInputData} = require('../schemes/components/field');

const defaultMinesPercentage = 0.2;

class PlayArea {
	redis = new Redis();
	contentCreator = new ContentCreator(this);

	constructor({width, height, minesCount}) {
		this.validateInputData({width, height, minesCount});

		this.width = width;
		this.height = height;
		this.minesCount = minesCount;

		this.field = this.createField();
		this.contentCreator.createContent();
	}

	validateInputData({width, height, minesCount}) {
		const {error} = fieldInputData.validate({width, height, minesCount});
		if (error) {
			throw new Error(error);
		}

		if (!(this.isValidSize(width) && this.isValidSize(height))) {
			throw new Error('Wrong size');
		}

		if (!this.isValidMinesCount(minesCount)) {
			this.setDefaultMinesCount();
		}
	}

	isValidSize(size) {
		return size && typeof size === 'number' && size > 2;
	}

	isValidMinesCount({width, height, minesCount}) {
		const cellsCount = height * width;
		return minesCount && typeof minesCount === 'number' && minesCount > 0 && minesCount < cellsCount;
	}

	setDefaultMinesCount() {
		this.setMinesCount(Math.round(this.width * this.height * defaultMinesPercentage));
	}

	createField() {
		return new Array(this.height)
			.fill(new Array(this.width).fill(null));
	}

	getHeight() {
		return this.height;
	}

	getWidth() {
		return this.width;
	}

	getField() {
		return this.field;
	}

	getMinesCount() {
		return this.minesCount;
	}

	setMinesCount(minesCount) {
		this.minesCount = minesCount;
	}

	updateField(field) {
		this.field = field;
	}
}

module.exports = PlayArea;
