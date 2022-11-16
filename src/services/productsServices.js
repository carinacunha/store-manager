const productsModels = require('../models/productsModel');

const getProducts = async () => {
  const products = await productsModels.findAll();
  return products; 
};

const getById = async (id) => {
  const [product] = await productsModels.findById(id);
  return product;
};

const insertProduct = async (name) => {
  const id = await productsModels.insert(name);
  return {
    id,
    name,
  };
};

const updateProd = async (id, name) => {
  const product = await productsModels.findById(id);
  if (product.length === 0) {
    throw new Error();
  } 
  await productsModels.update(id, name);
};

const deleteProd = async (id) => {
  const product = await productsModels.findById(id);
  if (product.length === 0) {
    throw new Error();
  }
  await productsModels.deleteById(id);
};

module.exports = {
  getProducts,
  getById,
  insertProduct,
  updateProd,
  deleteProd,
};