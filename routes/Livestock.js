// server/routes/livestock.js
const express = require('express');
const router = express.Router();
const Livestock = require('../models/Livestock');

router.get('/', async (req, res) => {
    try {
        const livestock = await Livestock.find();
        res.json(livestock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
 