const responseSucess = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const sales = [
  {
    productId: 1,
    quantity: 1,
  },
];

const createSalesWithoutId = [
  {
  quantity: 1,
  }
];

const createSalesWithoutQuatity = [
  {
    productId: 2,
  }
];

const createSalesInvalidQuatity = [
  {
    productId: 2,
    quantity: 0,
  }
];


const createSalesInvalidIdSingle = [
  {
    productId: 300,
    quantity: 2,
  }
];

const createSalesInvalidIdMulti = [
  {
    productId: 100,
    quantity: 1,
  },
  {
    productId: 290,
    quantity: 5,
  },
];

module.exports = {
  responseSucess,
  sales,
  createSalesWithoutId,
  createSalesWithoutQuatity,
  createSalesInvalidQuatity,
  createSalesInvalidIdSingle,
  createSalesInvalidIdMulti,
};