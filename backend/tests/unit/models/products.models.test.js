const sinon = require('sinon');
const { expect } = require('chai');
const { mockProducts } = require('../mocks/products');

const connection = require('../../../src/models/connection');
const productModels = require('../../../src/models/product.models');

describe('Teste o productModels', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Teste se o getAll retorna um array com os produtos', async function () {
    sinon.stub(connection, 'query').resolves(mockProducts);

    const response = await productModels.getAll();

    expect(response).to.be.an('array');
    expect(response[0]).to.be.an('object');
    expect(response[0]).to.have.all.keys('id', 'name');
  });

  it('Teste se o getId não encontra nada com o id passado', async function () {
    sinon.stub(connection, 'query').resolves([]);

    const response = await productModels.getId(1);

    expect(response).to.be.an('object');
  });

  it('Teste se o getId retorna um objeto', async function () {
    sinon.stub(connection, 'query').resolves(mockProducts);

    const response = await productModels.getId(1);

    expect(response).to.be.an('object');
    expect(response).to.have.all.keys('id', 'name');
  });
});