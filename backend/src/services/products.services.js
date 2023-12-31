const productModels = require('../models/product.models');

const getAll = async () => {
  const productsList = await productModels.getAll();
  return productsList;
};

const getId = async (id) => {
  const product = await productModels.getId(id);
  if (!product) {
    return { message: 'Product not found' };
  }
  return product;
};

const create = async (name) => {
  const product = await productModels.create(name);
  return product;
};

const update = async (id, name) => {
  const productId = await productModels.getId(id);
  if (!productId) {
    return { message: 'Product not found' };
  }

  const product = await productModels.update(id, name);
  return product;
};

const exclude = async (id) => {
  const product = await productModels.getId(id);
  if (!product) {
    return { message: 'Product not found' };
  }

  await productModels.exclude(id);
  return product;
};

module.exports = {
  getAll,
  getId,
  create,
  update,
  exclude,
};