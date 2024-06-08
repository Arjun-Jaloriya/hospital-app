const Joi = require("joi");

const patientSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().required(),
  address: Joi.string().required(),
  gender: Joi.string().valid("MALE", "FEMALE", "OTHER").required(),
});

module.exports = { patientSchema };
