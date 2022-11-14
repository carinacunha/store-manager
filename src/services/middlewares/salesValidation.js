const salesValidation = (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400)
  }
}