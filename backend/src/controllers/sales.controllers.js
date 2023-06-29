const salesServices = require('../services/sales.services');

const getAll = async (req, res) => {
  const sales = await salesServices.getAll();
  res.status(200).json(sales);
};

const getId = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.getId(Number(id));
  if (sale.message) {
    return res.status(404).json(sale);
  }
  res.status(200).json(sale);
};

module.exports = {
  getAll,
  getId,
};