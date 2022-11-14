const express = require('express');

const router = express.Router();
const salesController = require('../controllers/salesController');
const salesValidation = require('../middlewares/salesValidation');

router.post('/', salesValidation.validation, salesController.createNewSales);

module.exports = router;
