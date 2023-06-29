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

const create = async (name) => {
  const query = 'INSERT INTO products (name) VALUE (?)';
  const [products] = await connection.execute(query, [name]);
  return { id: products.insertId, name };
};

const update = async (id, name) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  await connection.execute(query, [name, id]);
  return { name, id };
};

module.exports = {
  getAll,
  getId,
  create,
  update,
};