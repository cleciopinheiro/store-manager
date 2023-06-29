const sinon = require('sinon');
const { expect } = require('chai');
const { mockSales } = require('../mocks/products');

const salesControllers = require('../../../src/controllers/sales.controllers');
const salesServices = require('../../../src/services/sales.services');

describe('Teste o serviceControllers', function () {
  beforeEach(function () {
    sinon.restore();
  });

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
});