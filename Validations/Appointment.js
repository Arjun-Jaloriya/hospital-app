const Joi = require("joi");
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const appointmentSchema = Joi.object({
  patientId: Joi.string().pattern(objectIdPattern).required().messages({
    "string.pattern.base": "Invalid ID format",
  }),
  caseType: Joi.string().valid("NEW", "FOLLOWUP").required(),
  fees: Joi.number(),
  date:Joi.date().required(),
});

module.exports = { appointmentSchema };
