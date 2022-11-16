const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
chai.use(require('sinon-chai'));

const salesControllers = require('../../../src/controllers/salesController');
const salesServices = require('../../../src/services/salesServices');

chai.use(sinonChai);

describe('Products controller', function () {
  describe('Cadastra vendas', function () {
    afterEach(() => {
      sinon.restore();
    });
    it('Deverá cadastrar uma venda', async function () {
      const infos = { id: 1, itemsSold: [{ productId: 1, quantity: 2 }] };

      const req = {
        itemsSold: [
          { productId: 2, quantity: 4 }
        ]
      }
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'insertSales').resolves(infos);

      await salesControllers.createNewSales(req, res);

      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledOnceWith(infos);
    });
    
    it('Deverá listar todas as vendas', async () => {
      const req = {}
      const res = {}
      const sales = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
      ];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getSales').resolves(sales);

      const response = await salesControllers.getAllSales(req, res);

      expect(res.status).to.have.been.calledOnceWith(200)
      expect(res.json).to.have.been.calledOnceWith(sales);

    });

    it('Deverá listar as vendas pelo id', async () => {
      const res = {};
      const req = {
        params: { id: 1 }
      };

      const sale = {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getById').resolves(sale);

      await salesControllers.getSaleById(req, res);

      chai.expect(res.status).to.have.been.calledWith(200);
      chai.expect(res.json).to.have.been.calledWith(sale);
    });
  });

  describe('Deleta uma venda', function () {
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

    it('Deverá deleta uma venda', async function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getById').resolves(getById);
      sinon.stub(salesServices, 'deleteProd').resolves();

      await salesControllers.deleteProductById(req, res);
      chai.expect(res.status).to.have.been.calledWith(204);
    });
  });
});