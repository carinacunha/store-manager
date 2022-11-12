const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');

describe('Products Model', function () {
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
      sinon.stub(connection, 'execute').resolves([execute]);

    });

    afterEach(function () {
      sinon.restore();
    });
      
    it('com o tipo array', async function () {
      const response = await productsModel.findAll();
      expect(response).to.be.a('array');
    });

    it('com sucesso', async function () {

      const response = await productsModel.findAll();

      expect(response).to.deep.equal(execute);
    });

    // connection.execute.restore();
  });
});