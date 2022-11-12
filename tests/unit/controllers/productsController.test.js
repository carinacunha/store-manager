const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');
chai.use(sinonChai);

const productsControllers = require('../../../src/controllers/productsController');

describe('Products controller', function () {

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
      sinon.stub(productsControllers, 'getAllProducts').resolves(execute);

    });

    afterEach(function () {
      sinon.restore();
    });

    it('com o tipo array', async function () {
      const response = await productsControllers.getAllProducts();
      expect(response).to.be.a('array');
    });

    it('com sucesso', async function () {

      const response = await productsControllers.getAllProducts();

      expect(response).to.deep.equal(execute);
    });
  });

  describe('encontra o produto pelo id', function () {
    const product = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      }
    ]
    const id = { id: 1 }
  
    beforeEach(function () {
      sinon.stub(productsControllers, 'getAllProducts').resolves(product);

    });

    afterEach(function () {
      sinon.restore();
    });

    it('com sucesso', async function () {

      const response = await productsControllers.getAllProducts(id);

      expect(response).to.deep.equal(product);

    });
  });

});