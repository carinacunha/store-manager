const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../src/services/productsServices');
const productsModels = require('../../../src/models/productsModel');

function mockModel(method, result, model = salesModel) {
  return sinon.stub(model, method).resolves(result);
};

describe('Products Service', function () {
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
      sinon.stub(productsModels, 'findProductByName').resolves(expected);
      const response = await productsServices.getProductByName(name);
      expect(response).to.equal(expected);
    });

    // it('Deverá buscar todos os produtos quando não existir query', async function () {
    //   sinon.stub(productsModels, 'findProductByName').resolves(all);
    //   const response = await productsServices.getProductByName();
    //   expect(response).to.equal(all);
    // });
  });

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
    ];

    it('Deveria retornar um array com os produtos', async function () {
      sinon.stub(productsModels, 'findAll').resolves(findAll);
      const response = await productsServices.getProducts();
      expect(response).to.be.a('array');
      expect(response).to.deep.equal(findAll);
    });
  });

  describe('Encontra um produto com sucess', () => {
    const findById = {
      "id": 1,
      "name": "Martelo de Thor"
    };
    const expected = {
      "id": 1,
      "name": "Martelo de Thor"
    };
    const payload = 1;

    it('Deveria encontrar o produto com sucesso', async function () {
      sinon.stub(productsModels, 'findById').resolves([findById]);
      const response = await productsServices.getById(payload);

      expect(response).to.deep.equal(expected);
    });
  });
  
  describe('Cadastra produto com sucess', () => {
    const insert = 4;
    const payload = "ProdutoX";
    const expected =
    {
      "id": 4,
      "name": "ProdutoX"
    };

    it('Deverá cadastrar o produto com sucesso', async function () {
      sinon.stub(productsModels, 'insert').resolves(insert);

      const response = await productsServices.insertProduct(payload);
      expect(response).to.deep.equal(expected);
    });
  });

  describe('Atualiza o produto', function () {
    const productById = {
      "id": 1,
      "name": "Martelo de Thor"
    };
    const infos = [1, 'Machado do Batman'];

    it('Deverá atualizar o produto com sucesso', async function () {
      sinon.stub(productsModels, 'findById').resolves(productById);
      const mockUp = sinon.stub(productsModels, 'update').resolves();

      const response = await productsServices.updateProd(infos);
      // expect(mockUp).to.have.been.calledWith(infos);
      expect(response).to.equal();
    });
  });
  
  describe('Deleta um produto', function () {
    const productById = {
      "id": 1,
      "name": "Martelo de Thor"
    };
    const id = 1;

    it('Deverá deletar um produto', async function () {
      sinon.stub(productsModels, 'findById').resolves(productById);
      sinon.stub(productsModels, 'deleteById').resolves();
      const response = await productsServices.deleteProd(id);
      expect(response).to.equal();
    });
  });
});
