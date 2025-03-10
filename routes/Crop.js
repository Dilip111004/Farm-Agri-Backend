// server/routes/crops.js
const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

router.get('/', async (req, res) => {
    try {
        const crops = await Crop.find();
        res.json(crops);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
