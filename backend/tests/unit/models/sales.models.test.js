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

  it('Teste se o create retorna um objeto', async function () {
    const stubExecute = sinon.stub(connection, 'execute').resolves();

    const response = await salesModels.create(1, 2, 10);

    expect(stubExecute).to.be.calledOnceWithExactly(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [1, 2, 10],
    );
    expect(response).to.be.equal(undefined);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});