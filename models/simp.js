// server/models/Product.js

const mongoose = require('mongoose');

// Product schema definition
const simp = new mongoose.Schema({
  name: { type: String  },
  price: { type: Number  },
});

// Export the Product model
module.exports = mongoose.model('simp', simp);
