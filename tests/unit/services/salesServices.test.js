const sinon = require('sinon');
const { expect } = require('chai');
const salesServices = require('../../../src/services/salesServices');
const salesMocks = require('./mocks/salesServices.mocks');
const salesModels = require('../../../src/models/salesModels');
const productsModels = require('../../../src/models/productsModel');

describe('Sales Services', function () {
  describe('Cadastra uma venda', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá cadastrar uma venda sem o campo productId', async function () {
      sinon.stub(salesModels, 'insert').resolves('"productId" is required');
      
      const response = await salesServices.insertSales([salesMocks.createSalesWithoutId]);
      expect(response.message).to.equal('"productId" is required');
    });
    
    // it('Deverá cadastrar uma venda sem o campo quantity', async function () {
    //   const response = await salesServices.insertSales(salesMocks.createSalesWithoutQuatity);
    //   expect(response.message).to.equal('"quantity" is required');
    // });
    
    // it('Deverá cadastrar uma venda com quantity = 0', async function () { 
    //   const response = await salesServices.insertSales(salesMocks.createSalesInvalidQuatity);
    //   expect(response.message).to.equal('"quantity" must be greater than or equal to 1');
    // });

    // it('Deverá cadastrar uma venda com id inexistente em req com único item', async function () { 
    //   const response = await salesServices.insertSales(salesMocks.createSalesInvalidIdSingle);
    //   expect(response.message).to.equal('Product not found');
    // });

    // it('Deverá cadastrar uma venda com id inexistente em req com múltiplos itens', async function () {
    //   const response = await salesServices.insertSales(salesMocks.createSalesInvalidIdMulti);
    //   expect(response.message).to.equal('Product not found');
    // });
    
    it('Deverá cadastrar uma venda com sucesso', async function () { 
      const sales = [{ "productId": 1, "quantity": 1 }];
      const responseSucess = {
        "id": 3,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 1
          }
        ]
      }

      sinon.stub(salesModels, 'insert').resolves([responseSucess]);
    
      const response = await salesServices.insertSales(sales);
      expect(response).to.be.deep.equal(responseSucess);
    });
   
  });


});
