const productsServices = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  const products = await productsServices.getProducts();
  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  
  const product = await productsServices.getById(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

const searchProducts = async (req, res) => {
  const name = req.query.q;
  const result = await productsServices.getProductByName(name);
  return res.status(200).json(result);
};

const insertNewProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productsServices.insertProduct(name);
  res.status(201).json(newProduct);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await productsServices.updateProd(id, name);
    return res.status(200).json({ id, name });
  } catch (err) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await productsServices.deleteProd(id);
    return res.status(204).json();
  } catch (err) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  insertNewProduct,
  updateProductById,
  deleteProductById,
  searchProducts,
};
