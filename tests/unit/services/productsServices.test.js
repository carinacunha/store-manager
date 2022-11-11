const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../src/services/productsServices');
const connection = require('../../../src/models/connection');

describe('Products Service', function () {
  describe('Lista todos os produtos', function () {
    const execute = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      }
    ]

    beforeEach(function () {
      sinon.stub(productsServices, 'getProducts').resolves(execute);

    });

    afterEach(function () {
      sinon.restore();
    });

   
    it('com o tipo array', async function () {
      const response = await productsServices.getProducts();
      expect(response).to.be.a('array');
    });

    it('com sucesso', async function () {

      const response = await productsServices.getProducts();

      expect(response).to.deep.equal(execute);
    });
  });
});