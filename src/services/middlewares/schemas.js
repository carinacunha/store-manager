const Joi = require('joi');

const addSalesSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = {
  addSalesSchema,
};