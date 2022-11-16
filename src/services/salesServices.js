const salesModels = require('../models/salesModels');

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

const deleteProd = async (id) => {
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
  deleteProd,
};