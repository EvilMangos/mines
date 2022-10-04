class PlayAreaMock {
	constructor({width, height, minesCount}) {
		this.width = width;
		this.height = height;
		this.minesCount = minesCount;
		this.field = this.createField();
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

	updateField(field) {
		this.field = field;
	}
}

module.exports = PlayAreaMock;
