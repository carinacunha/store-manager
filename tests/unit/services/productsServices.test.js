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

  describe('Atualiza um produto', function () {
    const product = {
      "id": 1,
      "name": "Martelo do Batman"
    };

    const idIns = 1;
    const name = "Machado do Batman"

    const expected = {
      "id": 1,
      "name": "Machado do Batman"
    };

    it('Deverá atualizar um produto com sucesso', async () => {
      mockModel('findById', ['1'], productsModels);
      sinon.stub(productsModels, 'update').resolves(expect);

      const response = await productsServices.updateProd(idIns, name);
      expect(response).to.deep.equal(expected);
    });
  });   
});
