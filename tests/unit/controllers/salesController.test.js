const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');

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
  });
});