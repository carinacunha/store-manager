const salesModels = require('../models/salesModels');
const productsModels = require('../models/productsModel');

const insertSales = async (sale) => {
  const idsProducts = sale.map(({ productId }) => productId).filter((id) => id);
  console.log(idsProducts);

  const idsArray = await idsProducts.map((id) => id).map((id) => productsModels.findById(id));
  
  const idExist = await productsModels.checkIds(idsProducts);
  console.log(idExist);
  if (idExist.length !== idsProducts.length) {
    throw new Error('Product not found');
  } 
  const idSale = await salesModels.insert(sale);
  return {
    id: idSale,
    itemSold: sale,
  };
};

module.exports = {
  insertSales,
};

const sale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const response = insertSales(sale);
// console.log(response);