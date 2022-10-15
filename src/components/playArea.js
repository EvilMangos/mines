const RedisService = require('../services/redis.service');
const ValidateService = require('../services/validate.service');
const ContentCreator = require('./contentCreator');

const {getAdditions, isCoordinateInRange} = require('../utils/utils');

class PlayArea {
	redisService = new RedisService();
	validateService = new ValidateService();

	contentCreator = new ContentCreator(this);

	constructor({width, height, minesCount}) {
		const validData = this.validateService.validatePlayAreaInputData({width, height, minesCount});

		this.width = validData.width;
		this.height = validData.height;
		this.minesCount = validData.minesCount;

		this.field = this.createField();
		this.contentCreator.createContent();
	}

	createField() {
		return new Array(this.height)
			.fill(new Array(this.width).fill(null));
	}

	getCell({row, column}) {
		return this.field[row][column];
	}

	openArea({row, column}) {
		const cell = this.getCell({row, column});
		this.openCell({row, column});

		if (cell.value === 0) {
			getAdditions().forEach(addition => {
				const newRow = row + addition.h;
				const newColumn = column + addition.w;

				if (this.isCellValidForOpening({row: newRow, column: newColumn})) {
					this.openArea({row: newRow, column: newColumn});
				}
			});
		}
	}

	openCell({row, column}) {
		this.field[row][column].isOpen = true;
	}

	isCellValidForOpening({row, column}) {
		if (isCoordinateInRange({field: this.field, row, column})) {
			const cell = this.getCell({row, column});
			return !cell.isMine && !cell.isOpen;
		}

		return false;
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

module.exports = PlayArea;
