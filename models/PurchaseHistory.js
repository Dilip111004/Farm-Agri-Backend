const mongoose = require('mongoose');

const purchaseHistorySchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true, // Ensures that productName is a required field
    },
    date: {
        type: Date,
        required: true, // Ensures that the date is required
        default: Date.now, // Automatically sets the current date if no date is provided
    },
});

module.exports = mongoose.model('PurchaseHistory', purchaseHistorySchema);
