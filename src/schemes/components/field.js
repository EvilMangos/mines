const template = require('../templateSchemes');
const Joi = require('joi');

const fieldSchemes = {
	fieldInputData: Joi.object({
		width: template.width,
		height: template.height,
		minesCount: template.minesCount.optional(),
	}),
};

module.exports = fieldSchemes;
