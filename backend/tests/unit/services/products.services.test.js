const sinon = require('sinon');
const { expect } = require('chai');
const { mockProducts } = require('../mocks/products');

const productsServices = require('../../../src/services/products.services');
const productsModels = require('../../../src/models/product.models');

describe('Teste o productServices', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Teste se o getAll retorna um array com os produtos', async function () {
    sinon.stub(productsModels, 'getAll').resolves(mockProducts);

    const products = await productsServices.getAll();

    expect(products).to.be.an('array');
  });

  it('Teste se o getId não encontra nada', async function () {
    sinon.stub(productsModels, 'getId').resolves();

    const products = await productsServices.getId(1);

    expect(products).to.be.an('object');

    expect(products).to.have.all.keys('message');
  });

  it('Teste se o getId o produto do id', async function () {
    sinon.stub(productsModels, 'getId').resolves(mockProducts[0]);

    const products = await productsServices.getId(1);

    expect(products).to.be.an('object');
    expect(products).to.have.all.keys('id', 'name');
  });
});