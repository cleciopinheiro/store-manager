const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

chai.use(sinonChai);

const { expect } = require('chai');
const { mockProducts, mockNewProduct } = require('../mocks/products');

const connection = require('../../../src/models/connection');
const productModels = require('../../../src/models/product.models');

describe('Teste o productModels', function () {
  it('Teste se o getAll retorna um array com os produtos', async function () {
    sinon.stub(connection, 'query').resolves(mockProducts);
    
    const response = await productModels.getAll();
    
    expect(response).to.be.an('array');
    expect(response[0]).to.be.an('object');
    expect(response[0]).to.have.all.keys('id', 'name');
  });
  
  it('Teste se o getId retorna um objeto', async function () {
    sinon.stub(connection, 'query').resolves(mockProducts);

    const response = await productModels.getId(1);
    
    expect(response).to.be.an('object');
    expect(response).to.have.all.keys('id', 'name');
  });

  it('Teste se o create retorna um objeto', async function () {
    sinon.stub(connection, 'query').resolves(mockNewProduct);

    const response = await productModels.create('Produto X');
    
    expect(response).to.be.an('object');
    expect(response).to.have.all.keys('id', 'name');
  });
  
  afterEach(function () {
    sinon.restore();
  });
});