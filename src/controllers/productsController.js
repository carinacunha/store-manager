const productsServices = require('../services/productsServices');
// const errorMap = require('../utils/errorMap');

const getAllProducts = async (_req, res) => {
  const products = await productsServices.getProducts();
  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.getById(id);

  if (product) {
    res.status(200).json(product);
  }
  res.status(404).json({ message: 'Product not found' });
};

const insertNewProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productsServices.insertProduct(name);
  res.status(201).json(newProduct);
};

module.exports = {
  getAllProducts,
  getProductById,
  insertNewProduct,
};