const express = require('express');
const productsController = require('../controllers/products.controllers');

const app = express.Router();

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getId);

module.exports = app;