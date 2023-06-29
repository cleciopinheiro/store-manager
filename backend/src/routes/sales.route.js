const express = require('express');

const salesController = require('../controllers/sales.controllers');

const app = express.Router();

app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getId);

module.exports = app;