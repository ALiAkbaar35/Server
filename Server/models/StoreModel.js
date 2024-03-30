const Joi = require("joi");

// Validation schema for store creation
const storeSchema = Joi.object({
  code: Joi.string().required(),
  description: Joi.string().required(),
  user_id: Joi.number().required(),
  created_at: Joi.date().iso().required(),
  updated_at: Joi.date().iso().required(),
});

// Function to validate store creation
const validateStore = (data) => {
  return storeSchema.validate(data);
};

module.exports = {
  validateStore,
};
