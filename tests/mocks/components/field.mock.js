class FieldMock {
	constructor({width, height, minesCount}) {
		this.width = width;
		this.height = height;
		this.minesCount = minesCount;
		this.createField();
	}

	createField() {
		this.field = new Array(this.height)
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

module.exports = FieldMock;