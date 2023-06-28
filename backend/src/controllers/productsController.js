const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProductsServices();
  res.status(200).json(products);
};

const getIdProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getIdProductServices(Number(id));
  if (product.message) {
    return res.status(404).json(product);
  }
  res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  getIdProduct,
};