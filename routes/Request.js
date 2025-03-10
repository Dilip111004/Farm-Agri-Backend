// server/routes/requests.js
const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

router.get('/', async (req, res) => {
    try {
        const requests = await Request.find();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
