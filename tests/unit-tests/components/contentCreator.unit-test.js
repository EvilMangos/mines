const ContentCreator = require('../../../src/components/contentCreator');
const FieldMock = require('../../mocks/components/field.mock');
const {isValidDataSchema, checkNumbersInField} = require('../../utils');
const contentCreatorSchemas = require('../../schemes/contentCreator.scheme');

describe('contentCreator', () => {
	const contentCreator = new ContentCreator();
	it.concurrent('contentCreator initField success', () => {
		const width = 5;
		const height = 8;
		const minesCount = 8;

		const field = new FieldMock({width, height, minesCount});
		const initField = contentCreator.initField(field);

		expect(initField.length).toBe(height);
		expect(initField[0].length).toBe(width);
		expect(isValidDataSchema(initField, contentCreatorSchemas.initField.response)).toBe(true);
	});

	it.concurrent('contentCreator getMinesPositionsInRow success', () => {
		const width = 5;
		const height = 8;
		const minesCount = 8;

		const field = new FieldMock({width, height, minesCount});
		const rowWithMines = contentCreator.getMinesPositionsInRow(field);

		const resMinesCount = rowWithMines.filter(element => element).length;

		expect(rowWithMines.length).toBe(height * width);
		expect(isValidDataSchema(rowWithMines, contentCreatorSchemas.getMinesPositionsInRow.response)).toBe(true);
		expect(resMinesCount).toBe(minesCount);
	});

	it.concurrent('contentCreator getFieldWithMines success', () => {
		const width = 5;
		const height = 8;
		const minesCount = 8;

		const field = new FieldMock({width, height, minesCount});
		field.updateField(contentCreator.initField(field));
		const fieldWithMines = contentCreator.getFieldWithMines(field);

		expect(fieldWithMines.length).toBe(height);
		expect(fieldWithMines[0].length).toBe(width);
		expect(isValidDataSchema(fieldWithMines, contentCreatorSchemas.getFieldWithMines.response)).toBe(true);
	});

	it.concurrent('contentCreator fillFieldByNumbers success', () => {
		const width = 5;
		const height = 8;
		const minesCount = 8;

		const field = new FieldMock({width, height, minesCount});

		field.updateField(contentCreator.initField(field));
		field.updateField(contentCreator.getFieldWithMines(field));

		const resultField = contentCreator.fillFieldByNumbers(field);

		expect(resultField.length).toBe(height);
		expect(resultField[0].length).toBe(width);
		expect(isValidDataSchema(resultField, contentCreatorSchemas.getFieldWithMines.response)).toBe(true);
		expect(checkNumbersInField(resultField)).toBe(true);
	});
});
