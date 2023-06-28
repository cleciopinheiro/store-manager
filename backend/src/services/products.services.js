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

module.exports = {
  getAll,
  getId,
};