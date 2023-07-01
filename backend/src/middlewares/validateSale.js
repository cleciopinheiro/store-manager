const productModels = require('../models/product.models');

const validateQuantity = (req, res, next) => {
  const quantities = req.body.map((item) => item.quantity);

  const isMissing = quantities.some((item) => item === undefined);
  const isInvalid = quantities.some((item) => item <= 0);

  switch (true) {
    case isMissing:
      return res.status(400).json({ message: '"quantity" is required' });
    case isInvalid:
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    default:
      return next();
  }
};

const validateProductId = async (req, res, next) => {
  const productList = await productModels.getAll();
  const productIds = productList.map((item) => item.id);

  const bodyIds = req.body;
  const saleIds = bodyIds.map((item) => item.productId);

  const validateId = saleIds.every((item) => productIds.includes(item));
  const validate = saleIds.some((item) => item === undefined);

  switch (true) {
    case validate:
      return res.status(400).json({ message: '"productId" is required' });
    case !validateId:
      return res.status(404).json({ message: 'Product not found' });
    default:
      return next();
  }
};

module.exports = {
  validateQuantity,
  validateProductId,
};