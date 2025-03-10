// server/models/Product.js

const mongoose = require('mongoose');

// Product schema definition
const productSchema = new mongoose.Schema({
  name: { type: String  },
  price: { type: Number  },
  description: { type: String  },
  imageUrl: { type: String, default: '' }, // imageUrl is optional
});

// Export the Product model
module.exports = mongoose.model('Product', productSchema);
