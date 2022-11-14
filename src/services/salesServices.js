const salesModels = require('../models/salesModels');

const insertSales = async (sale) => {
  console.log(sale);
  const idsProducts = await sale.map(({ productId }) => productId);
  console.log(idsProducts);
  
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

module.exports = {
  insertSales,
};