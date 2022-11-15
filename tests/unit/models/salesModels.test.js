const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { insert } = require('../../../src/models/productsModel');

const salesModels = require('../../../src/models/salesModels');

function mockModel(method, result, model = salesModel) {
  return sinon.stub(model, method).resolves(result);
}

describe('Sales Model', function () {
  afterEach(() => {
    sinon.restore();
  });
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

    const id = { insertId: 4}
      
    it('Deverá cadastra uma venda', async function () {
      sinon.stub(connection, 'execute').resolves([id]);

      const response = await insert();
      expect(response).to.equal(4);
    });

    it('Deverá encontrar os produtos cadastrados pelo id', async () => {
      const id = [1, 2];
      const result = { id: 1, name: 'Martelo de Thor' };
      sinon.stub(connection, 'execute').resolves([result]);

      const response = await salesModels.checkIds(id);

      expect(response).to.be.equal(result);
    });

    it('Deverá listar todas as vendas', async () => {
      const sales = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
      ];

      sinon.stub(connection, 'execute').resolves([sales]);

      const response = await salesModels.findAll();
      expect(response).to.be.equal(sales);
    })

    it('Deverá buscar a venda pelo id', async () => {
      const sales = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 2,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ];

      const idSale = 1;

      const result = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        }
      ];

      sinon.stub(connection, 'execute').resolves([result]);

      const response = await salesModels.findAll(idSale);
      expect(response).to.be.equal(result);
      


    })
  });
});
