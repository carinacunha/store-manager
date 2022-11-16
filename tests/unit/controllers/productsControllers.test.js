const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const productsControllers = require('../../../src/controllers/productsController');
const productsServices = require('../../../src/services/productsServices')

describe('Products controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Lista todos os produtos', function () {
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
    ];
    const res = {};

    it('Deverá listar todos os produtos', async function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getProducts').resolves(getProducts);

      await productsControllers.getAllProducts(req, res);

      chai.expect(res.status).to.have.been.calledWith(200);
      chai.expect(res.json).to.have.been.calledWith(getProducts);
    });
  });

  describe('Busca o produto pelo Id', function () {
    const req = {
      params: { id: 1 },
    };

    const getById = {
      "id": 1,
      "name": "Martelo de Thor"
    };

    const reqIdNull = {
      params: { id: null },
    };

    const res = {};

    it('Deverá buscar o produto pelo id', async function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getById').resolves(getById);

      await productsControllers.getProductById(req, res);

      chai.expect(res.status).to.have.been.calledWith(200);
      chai.expect(res.json).to.have.been.calledWith(getById);
    });

    it('Deverá enviar um erro se o produto não existir', async function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getById').resolves(null);

      await productsControllers.getProductById(reqIdNull, res);

      chai.expect(res.status).to.have.been.calledWith(404);
      chai.expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Cria um produto', function () {
    const req = {
      body: {
        name: 'Martelo de Thor'
      }
    };
    const res = {};

    const newProduct = { id: 1, name: 'Martelo de Thor' };

    it('Deverá criar um novo produto', async function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'insertProduct').resolves(newProduct);

      await productsControllers.insertNewProduct(req, res);

      chai.expect(res.status).to.have.been.calledWith(201);
      chai.expect(res.json).to.have.been.calledWith(newProduct);
    });
  })

  describe('Atualiza o produtro pelo id', function () {
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

    it('Deverá atualizar o produto pelo id', async function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getById').resolves(getById);
      sinon.stub(productsServices, 'updateProd').resolves()

      await productsControllers.updateProductById(req, res);

      chai.expect(res.status).to.have.been.calledWith(200);
      chai.expect(res.json).to.have.been.calledWith(getById);
    });
  });

  describe('Deleta um produto', function () {
    const req = {
      params: {
        id: 1
      }
    };
    const getById = {
      "id": 1,
      "name": "Martelo de Thor"
    };
    const res = {};

    it('Deverá deletar um produto', async function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getById').resolves(getById);
      sinon.stub(productsServices, 'deleteProd').resolves();
      
      await productsControllers.deleteProductById(req, res);
      chai.expect(res.status).to.have.been.calledWith(204);   
    });
  });
});