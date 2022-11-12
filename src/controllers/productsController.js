const productsServices = require('../services/productsServices');
// const errorMap = require('../utils/errorMap');

const getAllProducts = async (_req, res) => {
  const product = await productsServices.getProducts();

    return res.status(200).json(product);
};

module.exports = {
  getAllProducts,
};