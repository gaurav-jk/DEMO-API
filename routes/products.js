const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/products');

// Route to get all products
router.get('/', getAllProducts);

// Route to get a product by ID
router.get('/:id', getProductById);

module.exports = router;
