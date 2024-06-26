const Joi = require("joi");

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const addHospitalSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  address: Joi.string().required(),
  subscriptionId: Joi.string().pattern(objectIdPattern).required().messages({
    "string.pattern.base": "Invalid ID format",
  }),
});

module.exports = { addHospitalSchema };
