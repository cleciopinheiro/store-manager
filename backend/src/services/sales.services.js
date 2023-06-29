const salesModels = require('../models/sales.models');
const createSale = require('../utils/createSale');

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

const create = async (itemsSold) => {
  const insertId = await createSale();
  itemsSold.map(async (product) => {
    const { productId, quantity } = product;
    await salesModels.create(insertId, productId, quantity);  
  });
  return { id: insertId, itemsSold };
};

module.exports = {
  getAll,
  getId,
  create,
};