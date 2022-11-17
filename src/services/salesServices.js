const salesModels = require('../models/salesModels');
const productsModels = require('../models/productsModel');

const insertSales = async (sale) => {
  const idsProducts = await sale.map(({ productId }) => productId);
  const idExist = await salesModels.checkIds(idsProducts);
  
  if (idExist.length !== idsProducts.length) {
    throw new Error();
  } 
  const idSale = await salesModels.insert(sale);

  return {
    id: idSale,
    itemsSold: sale,
  };
};

const getSales = async () => {
  const sales = await salesModels.findAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModels.findById(id);
  if (sale.length === 0) {
    throw new Error();
  }
  return sale;
};

const updateSales = async (idSale, sales) => {
  const saleExist = await salesModels.findById(idSale);
  const productsExist = sales.map(({ productId }) => productsModels.findById(productId));
  const promise = await Promise.all(productsExist);
  const lengthPromise = promise.some((elem) => !elem.length);
  
  if (saleExist.length === 0) {
    throw new Error('Sale not found');
  }
  if (lengthPromise) {
    throw new Error('Product not found');
  } 
  const result = await salesModels.update(idSale, sales);
  return result;
};

const deleteSale = async (id) => {
  const sale = await salesModels.findById(id);
  if (sale.length === 0) {
    throw new Error();
  }
  await salesModels.deleteById(id);
};

module.exports = {
  insertSales,
  getSales,
  getById,
  deleteSale,
  updateSales,
};