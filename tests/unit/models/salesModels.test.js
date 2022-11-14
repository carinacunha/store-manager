const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { insert } = require('../../../src/models/productsModel');

describe('Sales Model', function () {
  describe('Cadastra uma nova venda', function () {

    const sales = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const insertId = { insertId: 1}

    const expected = 1
      
    it('Deverá cadastrar uma venda', async function () {
      sinon.stub(connection, 'execute').resolves([insertId]);
      const response = await insert(sales);
      expect(response).to.equal(expected);
    });
  });
});
