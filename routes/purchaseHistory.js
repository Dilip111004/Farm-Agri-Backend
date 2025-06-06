// server/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/PurchaseHistory');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
