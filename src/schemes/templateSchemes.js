const Joi = require('joi');

module.exports = {
	width: Joi.number().required().min(3),
	height: Joi.number().required().min(3),
	minesCount: Joi.number().min(0),
	field: Joi.array().items({isMine: Joi.boolean().required(), value: Joi.number().required()}),
};
