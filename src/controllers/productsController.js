const productsServices = require('../services/productsServices');
const errorMap = require('../utils/errorMap');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productsServices.getProducts();

  if (type) {
    return res.status(errorMap.mapError(type).json(message));
  } 
    return res.status(200).json(message);
};

module.exports = {
  getAllProducts,
};