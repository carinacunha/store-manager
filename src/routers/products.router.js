const express = require('express');

const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

module.exports = router;
