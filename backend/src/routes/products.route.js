const express = require('express');
const productsController = require('../controllers/products.controllers');

const app = express.Router();

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getId);
// app.post('/products', productsController.create);

module.exports = app;