const express = require('express');
const productsController = require('../controllers/products.controllers');
const validateName = require('../middlewares/validateName');

const app = express.Router();

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getId);
app.post('/products', validateName, productsController.create);
app.put('/products/:id', validateName, productsController.update);

module.exports = app;