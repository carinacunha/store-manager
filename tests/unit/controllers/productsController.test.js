const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');
chai.use(sinonChai);

const productsControllers = require('../../../src/controllers/productsController');
const connection = require('../../../src/models/connection');

describe('Products controller', function () {
  describe('Lista todos os produtos', function () {
    it('Listando todos os produtos', async function () {
      const res = {};
      const req = {};
      const produtos = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        }
      ]

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsControllers, 'getAllProducts')
        .resolves({ type: null, message: produtos });

      await productsControllers.getAllProducts(req, res);

      expect(res.json).to.have.been.calledOnceWith(produtos);
    });

    it('Buscando um produto pelo id', async function () {
      const produtosId = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
      ]
      const res = {};
      const req = {
        params: { id: 2 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsControllers, 'getProductById')
        .resolves({ type: 'ERRO', message: 'Product not found' });

      await productsControllers.getProductById(req, res);

      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnceWith({ message: 'Product not found' });
    });
  });

});