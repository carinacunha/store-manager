const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');
chai.use(sinonChai);

const productsControllers = require('../../../src/controllers/productsController');
const productsServices = require('../../../src/services/productsServices')

describe('Products controller', function () {
  it('Listando todos os produtos', async function () {
    const res = {};
    const req = {};
    const productList = [
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
      .stub(productsServices, 'getProducts')
      .resolves(productList);

    await productsControllers.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productList);
  });

//------------------

});