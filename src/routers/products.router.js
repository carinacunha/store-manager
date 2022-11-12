const express = require('express');

const router = express.Router();
const productsController = require('../controllers/productsController');
const { nameValidation } = require('../middlewares/productsValidation');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', nameValidation, productsController.insertNewProduct);

module.exports = router;
