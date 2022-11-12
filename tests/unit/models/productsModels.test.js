const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');

describe('Products Model', function () {
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
      const response = await productsModel.findAll();
      expect(response).to.be.a('array');
    });

    it('com sucesso', async function () {

      const response = await productsModel.findAll();

      expect(response).to.deep.equal(execute);
    });
  });

  describe('Cadastra um novo produto', function () {
    beforeEach(function () {
      const execute = { insertId: 1 };

      sinon.stub(connection, 'execute').resolves([execute]);

    });

    afterEach(function () {
      connection.execute.restore();
    });
    const expect = 4;

    const payload = {
      "name": "ProdutoX"
    }

    it('cadastra o produto com sucesso', async function () {
      const response = await productsModel.insert(payload);
      expect(response).to.equal(expected);
    });
  });

  describe('Encontra um produto pelo id', function () {
    before(async function () {
      const execute = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
      ];

      sinon.stub(connection, 'execute').resolves([execute]);
    });

    after(async function () {
      connection.execute.restore();
    });

    const expected = {
      "id": 1,
      "name": "Martelo de Thor"
    };

    const payload = 1;

    it('com sucesso', async function () {
      const response = await productsModel.findById(payload);

      expect(response).to.deep.equal(expected);
    });
  });
});