const productsModels = require('../models/productsModel');

const getProducts = async () => {
  const products = await productsModels.findAll();
  if (products) {
    return { type: null, message: products };
  }
};

module.exports = {
  getProducts,
};