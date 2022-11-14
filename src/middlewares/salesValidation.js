const validation = (req, res, next) => {
  const testProductId = req.body.map((sale) => sale.productId === undefined); 
  const testQuantity = req.body.map((sale) => sale.quantity === undefined); 
  const testQuantityNeg = req.body.map((sale) => sale.quantity <= 0); 
  console.log(testQuantity);

  if (testProductId.some((v) => v === true)) { 
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (testQuantity.some((v) => v === true)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (testQuantityNeg.some((v) => v === true)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = { validation };
