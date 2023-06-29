const productsServices = require('../services/products.services');

const getAll = async (req, res) => {
  const products = await productsServices.getAll();
  res.status(200).json(products);
};

const getId = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.getId(Number(id));
  if (product.message) {
    return res.status(404).json(product);
  }
  res.status(200).json(product);
};

module.exports = {
  getAll,
  getId,
};