// server/models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    buyerName: String,
    product: String,
    quantity: Number,
    status: String
});

module.exports = mongoose.model('Request', requestSchema);
