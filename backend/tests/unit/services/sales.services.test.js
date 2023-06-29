const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

chai.use(sinonChai);

const { expect } = require('chai');
const { mockSales } = require('../mocks/products');

const salesServices = require('../../../src/services/sales.services');
const salesModels = require('../../../src/models/sales.models');

describe('Teste o salesServices', function () {
  it('Teste se o getAll retorna um array com os produtos', async function () {
    sinon.stub(salesModels, 'getAll').resolves(mockSales);
    
    const products = await salesServices.getAll();
    
    expect(products).to.be.an('array');
  });
  
  it('Teste se o getId não encontra nada', async function () {
    sinon.stub(salesModels, 'getId').resolves([]);
    
    const products = await salesServices.getId(9);
    
    expect(products).to.be.an('object');
    
    expect(products).to.have.all.keys('message');
  });
  
  it('Teste se o getId o produto do id', async function () {
    sinon.stub(salesModels, 'getId').resolves(mockSales[0]);
    
    const products = await salesServices.getId(1);
    
    expect(products).to.be.an('object');
    expect(products).to.have.all.keys('saleId', 'date', 'productId', 'quantity');
  });

  it('Teste se o create retorna um objeto', async function () {
    sinon.stub(salesModels, 'create').resolves();
    
    const response = await salesServices.create([
      { productId: 1, quantity: 10 },
      { productId: 2, quantity: 20 },
    ]);
    
    expect(response).to.be.an('object');
    expect(response).to.have.all.keys('id', 'itemsSold');
  });
  
  afterEach(function () {
    sinon.restore();
  });
});