const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const salesControllers = require('../../../src/controllers/salesController');
const salesServices = require('../../../src/services/salesServices');
const salesMocks = require('./mocks/salesControllers.mocks');

describe('Products controller', function () {
  afterEach(sinon.restore);
  describe('Cadastra vendas', function () {
    it('Deverá cadastrar uma venda sem o campo productId', async function () {
      const req = {
        body: {
          quantity: 1,
        }
      };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'insertSales').resolves({ type: 'MISSING_VALUE', message: '"productId" is required' });

      await salesControllers.createNewSales(req, res);

      chai.expect(res.status).to.have.been.calledWith(400);
      chai.expect(res.json).to.have.been.calledWith(salesMocks.createSalesWithoutId);
    });

    it('Deverá cadastrar uma venda sem o campo quantity', async function () {
      const res = {};
      const req = {
        body: {
          productId: 2,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'insertSales').resolves({ type: 'MISSING_VALUE', message: '"quantity" is required' });

      await salesControllers.createNewSales(req, res);

      chai.expect(res.status).to.have.been.calledWith(400);
      chai.expect(res.json).to.have.been.calledWith(salesMocks.createSalesWithoutQuatity);

    });
    it('Deverá cadastrar uma venda com quantity = 0', async function () {
      const res = {};
      const req = {
        body: {
          productId: 2,
          quantity: 0,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'insertSales').resolves({ type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' });

      await salesControllers.createNewSales(req, res);

      chai.expect(res.status).to.have.been.calledWith(422);
      chai.expect(res.json).to.have.been.calledWith(salesMocks.createSalesWithoutQuatity);
    });

    it('Deverá cadastrar uma venda com id inexistente em req com único item', async function () {
      const res = {};
      const req = {
        body: {
          productId: 300,
          quantity: 2,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'insertSales').resolves({ type: 'NOT_FOUND', message: 'Product not found' });

      await salesControllers.createNewSales(req, res);

      chai.expect(res.status).to.have.been.calledWith(404);
      chai.expect(res.json).to.have.been.calledWith(salesMocks.createSalesInvalidIdSingle);
    });


    it('Deverá cadastrar uma venda com id inexistente em req com múltiplos itens', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 100,
            quantity: 1,
          },
          {
            productId: 290,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'insertSales').resolves({ type: 'NOT_FOUND', message: 'Product not found' });

      await salesControllers.createNewSales(req, res);

      chai.expect(res.status).to.have.been.calledWith(404);
      chai.expect(res.json).to.have.been.calledWith(salesMocks.createSalesInvalidIdMulti);

    });

    it('Deverá cadastrar uma venda com sucesso', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'insertSales').resolves(salesMocks.sales);
      await salesControllers.createNewSales(req, res);

      chai.expect(res.status).to.have.been.calledWith(200);
      chai.expect(res.json).to.have.been.calledWith(salesMocks.sales);

    });
  });
});