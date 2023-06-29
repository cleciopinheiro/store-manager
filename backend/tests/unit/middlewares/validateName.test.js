const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

chai.use(sinonChai);

const { expect } = require('chai');
const validateName = require('../../../src/middlewares/validateName');

describe('Teste a função validateName', function () {
  it('Teste a funcionalidade da função', function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.stub();
    
    req.body = { name: 'Produto' };
    
    validateName(req, res, next);
    expect(next.called).to.be.equal(true);
    expect(res.status.called).to.be.equal(false);
    expect(res.json.called).to.be.equal(false);
  });
  
  it('Teste com campo "name" ausente', function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.stub();
    
    req.body = {};
    
    validateName(req, res, next);
    expect(next.called).to.be.equal(false);
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
  });
  
  it('Teste com campo "name" menor que 5 caracteres', function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.stub();
    
    req.body = { name: 'Prod' };
    
    validateName(req, res, next);
    expect(next.called).to.be.equal(false);
    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
