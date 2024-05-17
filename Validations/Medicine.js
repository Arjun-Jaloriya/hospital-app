const Joi = require("joi");

const addMedicineSchema = Joi.object({
  name: Joi.string().required(),
  medicineType: Joi.string().required(),
  drug: Joi.array()
  .items(
    Joi.object({
      name: Joi.string().required(),
    })
  )
  .required(),
  price: Joi.number().positive().required(),
});

const updateMedicineSchema = Joi.object({
  name: Joi.string().required(),
  medicineType: Joi.string().required(),
  drug: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
      })
    )
    .required(),
  price: Joi.number().positive().required(),
});

module.exports = { addMedicineSchema, updateMedicineSchema };
