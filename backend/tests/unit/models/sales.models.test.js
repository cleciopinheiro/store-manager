const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

chai.use(sinonChai);

const { expect } = require('chai');
const { mockSales } = require('../mocks/products');

const connection = require('../../../src/models/connection');
const salesModels = require('../../../src/models/sales.models');

describe('Teste o salesModels', function () {
  it('Teste se o getAll retorna um array com os produtos', async function () {
    sinon.stub(connection, 'query').resolves(mockSales);
    
    const response = await salesModels.getAll();
    
    expect(response).to.be.an('array');
    expect(response[0]).to.be.an('object');
  });

  it('Teste se o getId retorna um objeto', async function () {
    sinon.stub(connection, 'query').resolves(mockSales);
    
    const response = await salesModels.getId(1);
    
    expect(response[0]).to.be.an('object');
  });
  
  afterEach(function () {
    sinon.restore();
  });
});