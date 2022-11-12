const productsServices = require('../services/productsServices');
// const errorMap = require('../utils/errorMap');

const getAllProducts = async (_req, res) => {
  const products = await productsServices.getProducts();
  return res.json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.getById(id);

  if (product) {
    return res.json(product);
  }
  return res.status(404).json({ message: 'Product not found' });
};

module.exports = {
  getAllProducts,
  getProductById,
};