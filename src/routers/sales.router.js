const express = require('express');

const router = express.Router();
const salesController = require('../controllers/salesController');
const salesValidation = require('../middlewares/salesValidation');

router.post('/', salesValidation.validation, salesController.createNewSales);
router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.delete('/:id', salesController.deleteProductById);

module.exports = router;
