const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
//const sinonChai = require('sinon-chai');

//chai.use(sinonChai);

const productsControllers = require('../../../src/controllers/productsController');
const productsServices = require('../../../src/services/productsServices')

describe('Products controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Lista todos os produtos', function() {
    it('Deverá listar todos os produtos', async function () {
      const req = {};
      const getProducts = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        }
      ]

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'getProducts').resolves(getProducts);

      await productsControllers.getAllProducts(req, res);

      chai.expect(res.status).to.have.been.calledWith(200);
      chai.expect(res.json).to.have.been.calledWith(getProducts);
    });
  });

  describe('Busca o produto pelo Id', function () {
    it('Deverá buscar o produto pelo id', async function () {
      const req = {
        params: { id: 1 },
      };

      const getById = {
        "id": 1,
        "name": "Martelo de Thor"
      };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'getById').resolves(getById);

      await productsControllers.getProductById(req, res);

      chai.expect(res.status).to.have.been.calledWith(200);
      chai.expect(res.json).to.have.been.calledWith(getById);
    });
  });

  describe('Atualiza o produtro pelo id', function () {
    it('Deverá atualizar o produto pelo id', async function () {
      const req = {
        params: {
          id: 1
        },
          body: {
            name: 'Martelo de Thor'
        },
      };

      const getById = {
        "id": 1,
        "name": "Martelo de Thor"
      };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'getById').resolves(getById);
      sinon.stub(productsServices, 'updateProd').resolves()

      await productsControllers.updateProductById(req, res);

      chai.expect(res.status).to.have.been.calledWith(200);
      chai.expect(res.json).to.have.been.calledWith(getById);
    });
  });
});