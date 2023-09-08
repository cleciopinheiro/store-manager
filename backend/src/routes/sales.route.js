const express = require('express');

const salesController = require('../controllers/sales.controllers');
const { validateProductId, validateQuantity, 
  validateUpdateSales } = require('../middlewares/validateSale');

const app = express.Router();

app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getId);
app.post('/sales', validateProductId, validateQuantity, salesController.create);
app.delete('/sales/:id', salesController.exclude);
app.put(
'/sales/:saleId/products/:productId/quantity', 
validateUpdateSales,
salesController.update,
);

module.exports = app;