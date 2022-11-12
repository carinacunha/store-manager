const productsModels = require('../models/productsModel');

const getProducts = async () => {
  const products = await productsModels.findAll();
  if (products) {
    return products;
  }
};

const getById = async (id) => {
  const product = await productsModels.findById(id);
  return product;
};

module.exports = {
  getProducts,
  getById,
};