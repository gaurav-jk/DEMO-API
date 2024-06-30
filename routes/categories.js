const express = require('express');
const router = express.Router();
const Category = require('../models/categories');

// GET all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific category by ID
router.get('/:id', getCategory, (req, res) => {
    res.json(res.category);
});

// POST a new category
router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        products: req.body.products,
        company: req.body.company
    });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware function to get category by ID
async function getCategory(req, res, next) {
    let category;
    try {
        category = await Category.findById(req.params.id);
        if (category == null) {
            return res.status(404).json({ message: 'Cannot find category' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.category = category;
    next();
}

module.exports = router;
