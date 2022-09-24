const ContentCreator = require('../../../src/components/contentCreator');

const FieldMock = require('../../mocks/components/field.mock');

describe('contentCreator', () => {
	const contentCreator = new ContentCreator();
	it('contentCreator initField', () => {
		const field = new FieldMock()
		const initField = contentCreator.initField(field);


	})
})