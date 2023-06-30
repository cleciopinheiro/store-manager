const productsServices = require('../services/products.services');

const getAll = async (req, res) => {
  const products = await productsServices.getAll();
  return res.status(200).json(products);
};

const getId = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.getId(Number(id));
  if (product.message) {
    return res.status(404).json(product);
  }
  return res.status(200).json(product);
};

const create = async (req, res) => {
  const { name } = req.body;
  const product = await productsServices.create(name);
  return res.status(201).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await productsServices.update(Number(id), name);
  if (product.message) {
    return res.status(404).json(product);
  }
  return res.status(200).json(product);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.exclude(Number(id));
  if (product.message) {
    return res.status(404).json(product);
  }
  return res.status(204).json(product);
};

module.exports = {
  getAll,
  getId,
  create,
  update,
  exclude,
};