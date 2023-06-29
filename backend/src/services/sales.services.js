const salesModels = require('../models/sales.models');

const getAll = async () => {
  const salesList = await salesModels.getAll();
  return salesList;
};

const getId = async (id) => {
  const sale = await salesModels.getId(id);
  if (sale.length === 0) {
    return { message: 'Sale not found' };
  }
  return sale;
};

module.exports = {
  getAll,
  getId,
};