const express = require('express');

const salesController = require('../controllers/sales.controllers');
const { validateProductId, validateQuantity } = require('../middlewares/validateSale');

const app = express.Router();

app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getId);
app.post('/sales', validateProductId, validateQuantity, salesController.create);

module.exports = app;