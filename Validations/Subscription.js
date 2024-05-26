const Joi = require("joi");

const addSubscriptionSchema = Joi.object({
  name: Joi.string().required(),
  month: Joi.number().required(),
});

module.exports = { addSubscriptionSchema };
