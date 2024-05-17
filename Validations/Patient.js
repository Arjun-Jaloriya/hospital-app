const Joi = require('joi');

const prescriptionSchema = Joi.object({
  medicines: Joi.string().required(),
  dose: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().default(Date.now),
});

const healthIssueSchema = Joi.object({
  description: Joi.string().required(),
  prescription: Joi.array().items(prescriptionSchema),
});

const healthDetailSchema = Joi.object({
  age: Joi.number().required(),
  weight: Joi.number().required(),
  bp: Joi.number().required(),
  date: Joi.date().default(Date.now),
});

const patientSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().required(),
  address: Joi.string().required(),
  healthDetails: Joi.array().items(healthDetailSchema),
  healthIssues: Joi.array().items(healthIssueSchema),
});

module.exports = { patientSchema };
