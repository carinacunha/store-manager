const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../src/services/productsServices');
const connection = require('../../../src/models/connection');
const { removeExpectHandler } = require('frisby');

describe('Products Service', function () {
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
      sinon.stub(connection, 'execute').resolves([execute]);

    });

    afterEach(function () {
      sinon.restore();
    });

   
    it('com o tipo array', async function () {
      const response = await productsServices.getProducts();
      expect(response).to.be.a('array');
    });

    it('com sucesso', async function () {

      const response = await productsServices.getProducts();

      expect(response).to.deep.equal(execute);
    });
  });

  describe('Encontra o produto pelo id', function () {
    const execute = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      }
    ]


    beforeEach(function () {
      sinon.stub(connection, 'execute').resolves([execute]);

    });

    afterEach(function () {
      sinon.restore();
    });

    const expected = {
      "id": 1,
      "name": "Martelo de Thor"
    };

    const payload = 1

    it('Encontra o produto com sucesso', async function () {
      const response = await productsServices.getById(payload);

      expect(response).to.deep.equal(expected);

    });

    describe('Cadastra um novo produto', function () {
      afterEach(function () {
        connection.execute.restore();
      });

      const payload = "ProdutoX"

      const expected = 
      {
        "id": 4,
        "name": "ProdutoX"
      }
    

      it('cadastra o produto com sucesso', async function () {
        const response = await productsServices.insertProduct(payload);
        expect(response).to.equal({ id: 4, payload });
      });
    });
  
  });
});