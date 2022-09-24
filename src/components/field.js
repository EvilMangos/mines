const Redis = require('./redis');
const ContentCreator = require('./contentCreator');

const defaultMinesPercentage = 0.2;

class Field {
	redis = new Redis();
	contentCreator = new ContentCreator();

	constructor({width, height, minesCount = null}) {
		this.width = width;
		this.height = height;
		this.minesCount = minesCount;
		this.createField();
		this.validateMinesCount();
		this.contentCreator.fillFieldByContent(this);
	}

	createField() {
		this.field = new Array(this.height)
			.fill(new Array(this.width).fill(null));
	}

	validateMinesCount() {
		if (this.getMinesCount()) {
			return;
		}

		this.setMinesCount(Math.round(this.width * this.height * defaultMinesPercentage));
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

module.exports = Field;
