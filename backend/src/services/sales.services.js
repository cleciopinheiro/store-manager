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

const update = async (saleId, productId, quantity) => {
  const sales = await salesModels.getAll();
  const saleExists = sales.some((item) => item.saleId === saleId);
  
  if (!saleExists) return { message: 'Sale not found' };
  
  const sale = await salesModels.getId(saleId);
  const product = sale.some((item) => item.productId === productId);

  if (!product) return { message: 'Product not found in sale' };

  await salesModels.update(saleId, productId, quantity);
  return { date: new Date(), productId, quantity, saleId }; 
};

const exclude = async (id) => {
  const sale = await salesModels.getId(id);
  if (sale.length === 0) {
    return { message: 'Sale not found' };
  }
  await salesModels.exclude(id);
  return sale;
};

module.exports = {
  getAll,
  getId,
  create,
  update,
  exclude,
};