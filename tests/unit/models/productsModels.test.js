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

    it('Deveria listar os produtos em um array', async function () {
      sinon.stub(connection, 'execute').resolves([execute]);
      const response = await productsModel.findAll();
      expect(response).to.be.a('array');
    });

    it('Deveria listar os produtos com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([execute]);
      const response = await productsModel.findAll();
      expect(response).to.deep.equal(execute);
    });
  });

  describe('Deveria encontrar um produto pelo id', function () {
    const execute = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
    ];

    const expected = [{
      "id": 1,
      "name": "Martelo de Thor"
    }];

    const payload = 1;

    it('com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([execute]);
      const response = await productsModel.findById(payload);

      expect(response).to.deep.equal(expected);
    });
  });

  describe('Cadastra um novo produto', function () {

    const execute = { insertId: 4 };
    const expected = 4;
    const payload = {
      "name": "ProdutoX"
    }

    it('Cadastra o produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([execute]);
      const response = await productsModel.insert(payload);
      expect(response).to.equal(expected);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});
