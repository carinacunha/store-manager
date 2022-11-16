const salesServices = require('../services/salesServices');

const createNewSales = async (req, res) => {
  try {
    const saleInfo = await salesServices.insertSales(req.body);
    return res.status(201).json(saleInfo);
  } catch (err) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

const getAllSales = async (_req, res) => {
  const sales = await salesServices.getSales();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await salesServices.getById(id);
    return res.status(200).json(sale);
  } catch (err) {
    return res.status(404).json({ message: 'Sale not found' });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await salesServices.deleteProd(id);
    return res.status(204).json();
  } catch (err) {
    return res.status(404).json({ message: 'Sale not found' });
  }
};

module.exports = {
  createNewSales,
  getAllSales,
  getSaleById,
  deleteProductById,
};
