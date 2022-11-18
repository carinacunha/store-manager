const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { insert } = require('../../../src/models/productsModel');

const salesModels = require('../../../src/models/salesModels');

function mockModel(method, result, model = salesModel) {
  return sinon.stub(model, method).resolves(result);
}

describe('Sales Model', function () {
  afterEach(() => {
    sinon.restore();
  });

  describe('Cadastra uma nova venda', function () {
    const payload = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const execute = { insertId: 4 };
    const expected = 4;
   

    it('Deveria cadastrar o produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([execute]);
      const response = await salesModels.insert(payload);
      expect(response).to.equal(expected);
    });
  });

  describe('Busca a venda de acordo con o id dos produtos', function () {
    it('Deverá encontrar os produtos cadastrados pelo id', async () => {
      const id = [1, 2];
      const result = { id: 1, name: 'Martelo de Thor' };
      sinon.stub(connection, 'execute').resolves([result]);

      const response = await salesModels.checkIds(id);

      expect(response).to.be.equal(result);
    });
  });

  describe('Lista todas as vendas', function () {
    it('Deverá listar todas as vendas', async () => {
      const sales = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
      ];

      sinon.stub(connection, 'execute').resolves([sales]);

      const response = await salesModels.findAll();
      expect(response).to.be.equal(sales);
    });
    });

  describe('Busca a venda pelo id', function () {
    it('Deverá buscar a venda pelo id', async () => {
      const sales = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 2,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ];

      const idSale = 1;

      const result = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        }
      ];

      sinon.stub(connection, 'execute').resolves([result]);

      const response = await salesModels.findAll(idSale);
      expect(response).to.be.equal(result);
    });
  });

  describe('Deveria encontrar uma venda pelo id do produto', function () {
    const expected = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      }
    ];

    const payload = 1;

    it('com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([expected]);
      const response = await salesModels.findById(payload);

      expect(response).to.deep.equal(expected);
    });
  });

  describe('Deleta uma venda', function () {
    const id = 1;

    it('Deverá deletar um produto', async function () {
      sinon.stub(connection, 'execute').resolves();
      const response = await salesModels.deleteById(id);
      expect(response).to.equal();
    });
  });

  describe('Atualiza uma venda', function () {
    const expected = {
      saleId: 1,
      itemsUpdated: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    const infos = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    it('Deverá atualizar um venda com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const response = await salesModels.update(1, infos);
      expect(response).to.deep.equal(expected);
    });
  });
});

 
