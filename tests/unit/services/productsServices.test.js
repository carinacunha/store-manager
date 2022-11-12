const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../src/services/productsServices');
const productsModels = require('../../../src/models/productsModel');

describe('Products Service', function () {
  describe('Lista todos os produtos', function () {
    const findAll = [
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
      sinon.stub(productsModels, 'findAll').resolves(findAll);
    });

    afterEach(function () {
      sinon.restore();
    });

    it('Deveria retornar um array', async function () {
      const response = await productsServices.getProducts();
      expect(response).to.be.a('array');
    });

    it('com sucesso', async function () {
      const response = await productsServices.getProducts();
      expect(response).to.deep.equal(findAll);
    });
  });

  describe('Encontra o produto pelo id', function () {
    const findById = {
        "id": 1,
        "name": "Martelo de Thor"
      }

    beforeEach(function () {
      sinon.stub(productsModels, 'findById').resolves(findById);

    });

    afterEach(function () {
      sinon.restore();
    });

    const expected = {
      "id": 1,
      "name": "Martelo de Thor"
    };

    const payload = 1

    it('Deveria encontrar o produto com sucesso', async function () {
      const response = await productsServices.getById(payload);

      expect(response).to.deep.equal(expected);
    });

    describe('Cadastra um novo produto', function () {
      const insert = 4;

      const payload = "ProdutoX";

      const expected =
      {
        "id": 4,
        "name": "ProdutoX"
      };
    
      beforeEach(function () {
        sinon.stub(productsModels, 'insert').resolves(insert);

      });

      afterEach(function () {
        sinon.restore();
      });

      it('cadastra o produto com sucesso', async function () {
        const response = await productsServices.insertProduct(payload);
        expect(response).to.deep.equal(expected);
      });
    });
  });
});