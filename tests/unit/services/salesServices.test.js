const sinon = require('sinon');
const chai = require('chai');

const { expect } = require('chai');

const salesServices = require('../../../src/services/salesServices');
const salesModels = require('../../../src/models/salesModels');

function mockModel(method, result, model = salesModel) {
  return sinon.stub(model, method).resolves(result);
};

describe('Sales Services', function () {
  describe('Cadastra uma venda', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá cadastrar uma venda com sucesso', async function () {
      const sales = [{ "productId": 1, "quantity": 1 }];
      const responseSucess = {
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 1
          }
        ]
      };

      sinon.stub(salesModels, 'insert').resolves(1);
      mockModel('checkIds', ['1'], salesModels);
      
      const response = await salesServices.insertSales(sales);
      expect(response).to.be.deep.equal(responseSucess);
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

      sinon.stub(salesModels, 'findAll').resolves(sales);

      const response = await salesServices.getSales();
      expect(response).to.be.equal(sales);
    });

    it('Deverá buscar a venda pelo id', async () => {
      const idSale = 1;

      const result = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        }
      ];

      sinon.stub(salesModels, 'findById').resolves(result);

      const response = await salesServices.getById(idSale);
      expect(response).to.be.equal(result);
    });
  });

  describe('Deleta uma venda', function () {
    const productById = {
      "id": 1,
      "name": "Martelo de Thor"
    };
    const id = 1;

    it('Deverá deletar uma venda', async function () {
      sinon.stub(salesModels, 'findById').resolves(productById);
      sinon.stub(salesModels, 'deleteById').resolves();
      const response = await salesServices.deleteSale(id);
      expect(response).to.equal();
    });
  });

  describe('Atualiza uma venda', function () {
    const expected = {
      saleId: 1,
      itemsUpdated: [
        {
          productId: 1,
          quantity: 1,
        }
      ],
    };
    const infos = [
      {
        productId: 1,
        quantity: 1,
      }
    ];

    it('Deverá atualizar um venda com sucesso', async function () {
      sinon.stub(salesModels, 'update').resolves(expected);
      
      const response = await salesServices.updateSales(1, infos);
      expect(response).to.deep.equal(expected);
    });
  });
});
