const Joi = require('joi');

const templatesSchemes = require('../../src/schemes/templateSchemes');

module.exports = {
	initField: {
		response: Joi.array().items(
			Joi.array().items(
				Joi.object({
					isMine: false,
					value: 0,
					isOpen: false,
				}),
			),
		),
	},
	getMinesPositionsInRow: {
		response: Joi.array().items(
			Joi.boolean(),
		),
	},
	getFieldWithMines: {
		response: Joi.array().items(
			Joi.array().items(
				templatesSchemes.cell,
			),
		),
	},
};
