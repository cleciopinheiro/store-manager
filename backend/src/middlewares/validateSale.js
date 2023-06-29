const productModels = require('../models/product.models');

const validateQuantity = (req, res, next) => {
  const quantity = req.body.map((item) => item.quantity);
  const validate = quantity.some((item) => item === undefined);
  const isInvalid = quantity.some((item) => item <= 0);

  if (validate) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (isInvalid) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const validateProductId = async (req, res, next) => {
  const productList = await productModels.getAll();
  const productIds = productList.map((item) => item.id);

  const bodyIds = req.body;
  console.log(bodyIds);
  const saleIds = bodyIds.map((item) => item.productId);

  const validateId = saleIds.every((item) => productIds.includes(item));

  const validate = saleIds.some((item) => item === undefined);

  if (validate) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (!validateId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  validateQuantity,
  validateProductId,
};