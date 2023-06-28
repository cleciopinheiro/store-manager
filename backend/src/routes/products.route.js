const express = require('express');
const { getAllProducts, getIdProduct } = require('../controllers/products.controllers');

const app = express.Router();

app.get('/products', getAllProducts);
app.get('/products/:id', getIdProduct);

module.exports = app;