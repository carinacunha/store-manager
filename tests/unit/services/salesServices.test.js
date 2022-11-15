const sinon = require('sinon');
const chai = require('chai');

const { expect } = require('chai');

const salesServices = require('../../../src/services/salesServices');
const salesModels = require('../../../src/models/salesModels');

function mockModel(method, result, model = salesModel) {
  return sinon.stub(model, method).resolves(result);
}

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
      }

      sinon.stub(salesModels, 'insert').resolves(1);
      const mock = mockModel('checkIds', ['1'], salesModels);
      
      const response = await salesServices.insertSales(sales);
      expect(response).to.be.deep.equal(responseSucess);
    });
  });
});
