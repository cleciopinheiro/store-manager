const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

chai.use(sinonChai);

const { expect } = require('chai');
const { validateQuantity } = require('../../../src/middlewares/validateSale');

describe('Teste a função validateQuantity', function () {
  it('deve retornar um erro 400 se "quantity" estiver ausente', function () {
    const req = {
      body: [
        { quantity: 5 },
        { price: 10 },
      ],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const next = sinon.spy();

    validateQuantity(req, res, next);

    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"quantity" is required' });
  });

  it('deve retornar um erro 422 se "quantity" for menor ou igual a zero', function () {
    const req = {
      body: [
        { quantity: 5 },
        { quantity: -1 },
      ],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const next = sinon.spy();

    validateQuantity(req, res, next);

    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('deve chamar o próximo middleware se "quantity" for válido', function () {
    const req = {
      body: [
        { quantity: 5 },
        { quantity: 10 },
      ],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const next = sinon.spy();

    validateQuantity(req, res, next);
  });
});
