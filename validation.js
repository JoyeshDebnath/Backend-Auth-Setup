const joi = require("@hapi/joi");

//validation schema design using joi
//validation
const RegisterValidation = (data) => {
	const schema = joi.object({
		name: joi.string().min(6).required(),
		email: joi.string().email().min(6).required(),
		password: joi.string().min(6).required(),
	});

	return schema.validate(data);
};

// login validation function
const loginValidation = (data) => {
	const schema = joi.object({
		email: joi.string().min(6).email().required(),
		password: joi.string().min(6).required(),
	});
	return schema.validate(data);
};

module.exports = {
	loginValidation,
	RegisterValidation,
};
