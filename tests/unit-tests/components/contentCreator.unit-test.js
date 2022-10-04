const ContentCreator = require('../../../src/components/contentCreator');
const PlayAreaMock = require('../../mocks/components/playArea.mock');

const {isValidDataSchema, checkNumbersInField} = require('../../utils');
const contentCreatorSchemas = require('../../schemes/contentCreator.scheme');

describe('contentCreator', () => {
	it.concurrent('contentCreator initField success', () => {
		const width = 5;
		const height = 8;
		const minesCount = 8;

		const playArea = new PlayAreaMock({width, height, minesCount});
		const contentCreator = new ContentCreator(playArea);

		const initField = contentCreator.initField();

		expect(initField.length).toBe(height);
		expect(initField[0].length).toBe(width);
		expect(isValidDataSchema(initField, contentCreatorSchemas.initField.response)).toBe(true);
	});

	it.concurrent('contentCreator getMinesPositionsInRow success', () => {
		const width = 5;
		const height = 8;
		const minesCount = 8;

		const playArea = new PlayAreaMock({width, height, minesCount});
		const contentCreator = new ContentCreator(playArea);

		const rowWithMines = contentCreator.getMinesPositionsInRow();

		const resMinesCount = rowWithMines.filter(element => element).length;

		expect(rowWithMines.length).toBe(height * width);
		expect(isValidDataSchema(rowWithMines, contentCreatorSchemas.getMinesPositionsInRow.response)).toBe(true);
		expect(resMinesCount).toBe(minesCount);
	});

	it.concurrent('contentCreator getFieldWithMines success', () => {
		const width = 5;
		const height = 8;
		const minesCount = 8;

		const playArea = new PlayAreaMock({width, height, minesCount});
		const contentCreator = new ContentCreator(playArea);

		playArea.updateField(contentCreator.initField());
		const fieldWithMines = contentCreator.createMines();

		expect(fieldWithMines.length).toBe(height);
		expect(fieldWithMines[0].length).toBe(width);
		expect(isValidDataSchema(fieldWithMines, contentCreatorSchemas.getFieldWithMines.response)).toBe(true);
	});

	it.concurrent('contentCreator fillFieldByNumbers success', () => {
		const width = 5;
		const height = 8;
		const minesCount = 8;

		const playArea = new PlayAreaMock({width, height, minesCount});
		const contentCreator = new ContentCreator(playArea);

		playArea.updateField(contentCreator.initField());
		playArea.updateField(contentCreator.createMines());

		const resultField = contentCreator.fillFieldByNumbers();

		expect(resultField.length).toBe(height);
		expect(resultField[0].length).toBe(width);
		expect(isValidDataSchema(resultField, contentCreatorSchemas.getFieldWithMines.response)).toBe(true);
		expect(checkNumbersInField(resultField)).toBe(true);
	});
});
