const express = require('express');

const router = express.Router();
const productsController = require('../controllers/productsController');
const { nameValidation } = require('../middlewares/productsValidation');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', nameValidation, productsController.insertNewProduct);
router.put('/:id', nameValidation, productsController.updateProductById);

module.exports = router;
