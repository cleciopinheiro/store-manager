const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

chai.use(sinonChai);

const { expect } = require('chai');
const { mockSales, mockNewSale } = require('../mocks/products');

const salesControllers = require('../../../src/controllers/sales.controllers');
const salesServices = require('../../../src/services/sales.services');

describe('Teste o serviceControllers', function () {
it('Teste se o getAll retorna um array com os serviços', async function () {
    sinon.stub(salesServices, 'getAll').resolves(mockSales);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesControllers.getAll(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(mockSales)).to.be.equal(true);
  });

  it('Teste se o getId não encontra nada', async function () {
    sinon.stub(salesServices, 'getId').resolves({ message: 'Sale not found' });

    const req = {};
    const res = {};

    req.params = { id: 9 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesControllers.getId(req, res);

    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
  });

  it('Teste se o getId retorna um array com o serviço do id', async function () {
    sinon.stub(salesServices, 'getId').resolves(mockSales[0]);

    const req = {};
    const res = {};

    req.params = { id: 1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesControllers.getId(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(mockSales[0])).to.be.equal(true);
  });

  it('Teste se o create retorna um objeto', async function () {
    sinon.stub(salesServices, 'create').resolves(mockNewSale);

    const req = {};
    const res = {};

    req.body = mockNewSale;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesControllers.create(req, res);

    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith(mockNewSale)).to.be.equal(true);
  });

  afterEach(function () {
    sinon.restore();
  });
});