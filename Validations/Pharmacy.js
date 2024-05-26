const Joi = require("joi");

const addPharmacySchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
    address: Joi.string().required(),
});

module.exports = { addPharmacySchema };
