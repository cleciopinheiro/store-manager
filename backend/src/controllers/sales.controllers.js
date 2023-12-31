const salesServices = require('../services/sales.services');

const getAll = async (req, res) => {
  const sales = await salesServices.getAll();
  return res.status(200).json(sales);
};

const getId = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.getId(Number(id));
  if (sale.message) {
    return res.status(404).json(sale);
  }
  return res.status(200).json(sale);
};

const create = async (req, res) => {
  const productsSold = req.body;
  const sale = await salesServices.create(productsSold);
  return res.status(201).json(sale);
};

const update = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const sale = await salesServices.update(Number(saleId), Number(productId), Number(quantity));
  if (sale.message) {
    return res.status(404).json(sale);
  }
  return res.status(200).json(sale);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.exclude(Number(id));
  if (sale.message) {
    return res.status(404).json(sale);
  }
  return res.status(204).json(sale);
};

module.exports = {
  getAll,
  getId,
  create,
  update,
  exclude,
};