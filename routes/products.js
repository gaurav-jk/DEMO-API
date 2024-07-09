const express = require("express");
const router = express.Router();
const { getProductById } = require('../controllers/products');

const{
    getAllProducts,getAllProductsTesting,
} = require("../controllers/products")

// GET all products
router.route("/").get(getAllProducts);
// GET product by ID
router.route('/:id').get(getProductById);

router.route("/testing").get(getAllProductsTesting);

module.exports = router;