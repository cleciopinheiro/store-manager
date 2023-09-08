const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity 
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    ORDER BY sp.sale_id, sp.product_id`;

  const [sales] = await connection.execute(query);
  return sales;
};

const getId = async (id) => {
  const query = `SELECT sale.date, product.product_id AS productId, product.quantity 
  FROM StoreManager.sales AS sale
  JOIN StoreManager.sales_products AS product
  ON sale.id = product.sale_id
  WHERE sale.id = ?
  ORDER BY sale.id, productId`;
  
  const [sales] = await connection.execute(query, [id]);
  return sales;
};

const create = async (id, productId, quantity) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  await connection.execute(query, [id, productId, quantity]);
};

const update = async (saleId, productId, quantity) => {
  const query = `UPDATE StoreManager.sales_products 
  SET quantity = ? WHERE sale_id = ? AND product_id = ?`;
  const updateSale = await connection.execute(query, [saleId, productId, quantity]);
  return updateSale;
};

const exclude = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = {
  getAll,
  getId,
  create,
  update,
  exclude,
};
