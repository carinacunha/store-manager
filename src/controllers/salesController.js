const salesServices = require('../services/salesServices');

const createNewSales = async (req, res) => {
  try {
    const saleInfo = await salesServices.insertSales(req.body);
    return res.status(201).json(saleInfo);
  } catch (err) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  createNewSales,
};