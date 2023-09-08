const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

chai.use(sinonChai);

const { expect } = require('chai');
const { validateProductId } = require('../../../src/middlewares/validateSale');
const productModels = require('../../../src/models/product.models');

describe('Teste a função validateProductId', function () {
  it('Deve retornar um status 400 com a mensagem de erro correta quando o "productId" está ausente', async function () {
    const req = {
      body: [{}],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await validateProductId(req, res);

    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"productId" is required' });
  });

  it('Deve retornar um status 404 com a mensagem de erro correta quando um ou mais produtos não forem encontrados', async function () {
    const req = {
      body: [
        { productId: 1 },
        { productId: 2 },
        { productId: 3 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    
    const productList = [
      { id: 1 },
      { id: 2 },
    ];
    sinon.stub(productModels, 'getAll').resolves(productList);

    await validateProductId(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Product not found' });

    productModels.getAll.restore();
  });
});
