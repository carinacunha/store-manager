const productsModels = require('../models/productsModel');

const getProducts = async () => {
  const products = await productsModels.findAll();
  return products; 
};

const getById = async (id) => {
  const product = await productsModels.findById(id);
  return product;
};

const insertProduct = async (name) => {
  const id = await productsModels.insert(name);
  return {
    id,
    name,
  };
};

module.exports = {
  getProducts,
  getById,
  insertProduct,
};