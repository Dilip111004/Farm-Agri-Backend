require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT token generation
const EmployeeModel = require('./models/login'); // Import Employee Model
const Livestock = require('./routes/Livestock');
const crops = require('./routes/Crop');
const Product = require('./routes/Product'); // Product route handler
const request = require('./routes/Request');
const purreq = require('./routes/purchaseHistory');
const Products = require('./models/Product'); 


const app = express();
const PORT = process.env.PORT || 3001;

// Environment variables validation
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  console.error('Environment variables MONGODB_URI and JWT_SECRET are required.');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON body
app.use(helmet());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Farm Management API');
});



// app.post('/AddCrop', async (req, res) => {
//   const { name, quantity,plantingDate } = req.body;

//   // Validate input
//   if (!name ) {
//     return res.status(400).json({ message: 'Name and price are required' });
//   }

//   try {
//     // Create a new product instance
//     const newProduct = new crops({
//       name,
//       quantity,
//       plantingDate
//     });

//     // Save the new product to the database
//     const savedProduct = await newProduct.save();

//     // Send a response with the saved product
//     res.status(201).json({ message: 'Product added successfully', product: savedProduct });

//   } catch (err) {
//     console.error('Error adding product:', err);
//     res.status(500).json({ message: 'Error adding product', error: err.message });
//   }
// });




// Product creation route
app.post('/api/products', async (req, res) => {
  const { name, price, description,imgUrl } = req.body;

  // Ensure the name and price are provided
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  try {
    // Creating a new product instance
    const newProduct = new Products({
      name,
      price,
      description,
      imgUrl
    });

    // Saving the product to the database
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);  // Log the error to get more information
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
});









// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No record exists' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'The password is incorrect' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token and user details
    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        cType: user.customertype,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Register route
app.post('/register', async (req, res) => {
  const { name, email, password, customertype } = req.body;

  try {
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new EmployeeModel({ name, email, password: hashedPassword, customertype });
    const savedEmployee = await newEmployee.save();
    return res.status(201).json(savedEmployee);
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Other routes (Livestock, Crop, Request, etc.)
app.use('/Live', Livestock);
app.use('/Crop', crops);
app.use('/Pro', Product); // Product route for managing products
app.use('/Requests', request);
app.use('/Purreq', purreq);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
