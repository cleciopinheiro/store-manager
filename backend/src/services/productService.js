const products = require('../models/product.models');

const getAllProductsServices = async () => {
  const productsList = await products.getAll();
  return productsList;
};

const getIdProductServices = async (id) => {
  const product = await products.getId(id);
  if (!product) {
    return { message: 'Product not found' };
  }
  return product;
};

module.exports = {
  getAllProductsServices,
  getIdProductServices,
};