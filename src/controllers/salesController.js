const salesServices = require('../services/salesServices');
const mapError = require('../utils/errorMap');

const createNewSales = async (req, res) => {
  const { productId, quantity } = req.body;
  const { type, message } = await salesServices.insertSales(productId, quantity);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(201).json(message);
};

module.exports = {
  createNewSales,
};