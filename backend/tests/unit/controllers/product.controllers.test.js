const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

chai.use(sinonChai);

const { expect } = require('chai');
const { mockProducts, mockNewProduct } = require('../mocks/products');

const productsControllers = require('../../../src/controllers/products.controllers');
const productsServices = require('../../../src/services/products.services');

describe('Teste o productControllers', function () {
  it('Teste se o getAll retorna um array com os produtos', async function () {
    sinon.stub(productsServices, 'getAll').resolves(mockProducts);
    
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    
    await productsControllers.getAll(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(mockProducts)).to.be.equal(true);
  });
  
  it('Teste se o getId não encontra nada', async function () {
    sinon.stub(productsServices, 'getId').resolves({ message: 'Product not found' });
    
    const req = {};
    const res = {};
    
    req.params = { id: 9 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    
    await productsControllers.getId(req, res);
    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
  });
  
  it('Teste se o getId retorna um array com o produto do id', async function () {
    sinon.stub(productsServices, 'getId').resolves(mockProducts[0]);

    const req = {};
    const res = {};

    req.params = { id: 1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    
    await productsControllers.getId(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(mockProducts[0])).to.be.equal(true);
  });

  it('Teste se o create retorna um objeto', async function () {
    sinon.stub(productsServices, 'create').resolves(mockNewProduct);

    const req = {};
    const res = {};

    req.body = mockNewProduct;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    
    await productsControllers.create(req, res);
    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith(mockNewProduct)).to.be.equal(true);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});