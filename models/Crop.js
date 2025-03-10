// server/models/Crop.js
const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    name: String,
    quantity: String,
    plantingDate: Date
});

module.exports = mongoose.model('Crop', cropSchema);
