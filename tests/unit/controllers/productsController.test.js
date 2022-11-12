const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = require('chai');

const productsControllers = require('../../../src/controllers/productsController');
const productsServices = require('../../../src/services/productsServices')
const mocks = require('./mocks/productsController.mocks');

describe('Products controller', function () {
  
  it('Deveria listar todos os produtos', async function () {
    const res = {};
    const req = {};
    const products = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' }
    ]

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'getProducts').resolves({ message: products });

    await productsControllers.getAllProducts();

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ message: products });  
  });
  
  // it('Busca o produto pelo id', async function () {
  //   const res = {};
  //   const req = {};

  //   res.status = sinon.stub().returns();
  //   res.json = sinon.stub().returns();
  //   sinon.stub(productsServices, 'getById').resolves(mocks.product);

  //   const result = await productsControllers.getProductById(1);

  //   expect(result).to.be.equal(mocks.product);
  // });
  afterEach(sinon.restore);
});