const express = require('express');

const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/products', async (_req, res) => {
  const result = await productsController.getAllProducts();
  res.status(200).json(result);
});

module.exports = router;
