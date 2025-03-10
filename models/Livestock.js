// server/models/Livestock.js
const mongoose = require('mongoose');

const livestockSchema = new mongoose.Schema({
    animalType: String,
    count: Number,
    healthStatus: String
});

module.exports = mongoose.model('Livestock', livestockSchema);
