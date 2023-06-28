const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

const getId = async (id) => {
  const [products] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return products[0];
};

module.exports = {
  getAll,
  getId,
};