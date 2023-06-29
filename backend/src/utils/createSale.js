const connection = require('../models/connection');

const createSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );
  return insertId;
};

module.exports = createSale;