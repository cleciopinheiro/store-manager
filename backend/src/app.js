const express = require('express');

const products = require('./routes/products.route');
const sales = require('./routes/sales.route');

const app = express();
app.use(express.json());
app.use(products);
app.use(sales);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
