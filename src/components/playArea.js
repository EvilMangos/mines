const RedisService = require('../services/redis.service');
const ValidateService = require('../services/validate.service');
const ContentCreator = require('./contentCreator');

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
