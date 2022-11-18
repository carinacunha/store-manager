const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');

describe('Products Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Busca o produto pelo nome', function () {
    const name = 'martelo';
    const expected = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      }
    ];

    const all = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      }
    ];

    it('Deverá buscar o produto pela query', async function () {
      sinon.stub(connection, 'execute').resolves([expected]);
      const response = await productsModel.findProductByName(name);
      expect(response).to.equal(expected);
    });

    it('Deverá buscar todos os produtos quando não existir query', async function () {
      sinon.stub(connection, 'execute').resolves([all]);
      const response = await productsModel.findProductByName();
      expect(response).to.equal(all);
    });
  });

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

    it('Deveria cadastrar o produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([execute]);
      const response = await productsModel.insert(payload);
      expect(response).to.equal(expected);
    });
  });
  
  describe('Atualiza um produto', function () {
    const infos = [1, 'Machado do Batman'];

    it('Deverá atualizar um produto', async function () {
      sinon.stub(connection, 'execute').resolves();
      const response = await productsModel.update(infos);
      expect(response).to.equal();
    });
  });

  describe('Deleta um produto', function () {
    const id = 1;

    it('Deverá deletar um produto', async function () {
      sinon.stub(connection, 'execute').resolves();
      const response = await productsModel.deleteById(id);
      expect(response).to.equal();
    });
  });
});
