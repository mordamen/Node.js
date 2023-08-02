const Joi = require('joi');

createCardSchema = Joi.object({
	title: Joi.string().min(2).max(256).required(),
	subTitle: Joi.string().min(2).max(256).required(),
	description: Joi.string().min(2).max(1024).required(),
	email: Joi.string()
		.email({ minDomainSegments: 2 })
		.min(2)
		.max(1024)
		.required(),
	phone: Joi.string()
		.regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
		.required(),
	web: Joi.string()
		.regex(
			new RegExp(
				/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
			)
		)
		.allow(''),
	image: Joi.object().keys({
		url: Joi.string().regex(
			new RegExp(
				/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
			)
		),
		alt: Joi.string().min(2).max(256).required(),
	}),
	address: Joi.object().keys({
		state: Joi.string().min(0).max(256),
		country: Joi.string().min(2).max(256).required(),
		city: Joi.string().min(2).max(256).required(),
		street: Joi.string().min(2).max(256).required(),
		houseNumber: Joi.number().min(1).required(),
		zip: Joi.number().min(0).allow(''),
	}),
	bizNumber: Joi.number().min(0).max(9999999).required(),
	user_id: Joi.string().hex().length(24),
});

const idSchema = Joi.string().length(24).hex().required();

const validateCardSchema = (userInput) => {
	return createCardSchema.validateAsync(userInput);
};

const validateIdSchema = (idToCheck) => {
	return idSchema.validateAsync(idToCheck);
};

module.exports = {
	validateCardSchema,
	validateIdSchema,
};
