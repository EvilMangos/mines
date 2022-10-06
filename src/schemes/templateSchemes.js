const Joi = require('joi');

module.exports = {
	width: Joi.number().required().min(3),
	height: Joi.number().required().min(3),
	minesCount: Joi.number(),
	field: Joi.array().items({isMine: Joi.boolean().required(), value: Joi.number().required()}),
	cell: Joi.object({
		isMine: Joi.boolean().required(),
		value: Joi.number().required(),
		isOpen: Joi.boolean().required(),
	}),
};
