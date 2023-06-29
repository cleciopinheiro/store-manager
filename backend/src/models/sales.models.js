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

module.exports = {
  getAll,
  getId,
};
