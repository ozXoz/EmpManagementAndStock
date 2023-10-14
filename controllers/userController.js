const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Ensure you have jwt
const Product = require('../models/Product');



// Handle user registration
exports.register = async (req, res) => {
  try {
    // Create a new user instance
    const user = new User(req.body);

    // Save the user in the database
    await user.save();

    // Respond with the created user
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
};

// ... other imports and code

exports.login = async (req, res) => {
  try {
    // Validate user credentials
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send({ message: 'Login failed! Check authentication credentials' });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).send({ message: 'Invalid username/password' });
    }

    // Include the permissions property when creating the token
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        permissions: user.permissions, // Include permissions
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    // Respond with token and role
    res.send({
      user,
      token,
      message: user.role === 'admin' ? 'Logged in as admin' : 'Logged in as user',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


// userController.js

// Function to add a product
// Function to add a product
exports.addProduct = async (req, res) => {
  // Check if the user has permission to add products
  if (!req.user.permissions.addProduct) { // Change this line
    return res.status(403).json({ error: 'Unauthorized to add products' });
  }

  try {
    // Add the product logic here (e.g., saving to the database)
    // ...
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error adding product' });
  }
};

// Similar changes for deleteProduct, updateProduct, and viewProducts


// Function to delete a product
exports.deleteProduct = async (req, res) => {
  // Check if the user has permission to delete products
  if (!req.user.permissions.deleteProduct) {
    return res.status(403).json({ error: 'Unauthorized to delete products' });
  }

  try {
    // Add the delete product logic here (e.g., deleting from the database)
    // ...
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting product' });
  }
};


// Function to update a product
exports.updateProduct = async (req, res) => {
  // Check if the user has permission to update products
  if (!req.user.permissions.updateProduct) {
    return res.status(403).json({ error: 'Unauthorized to update products' });
  }

  const { id } = req.params;
  const { name, quantity, description, productType } = req.body;

  try {
    // Add the update product logic here (e.g., updating in the database)
    // ...
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error updating product' });
  }
};


// Function to view all products
exports.viewProducts = async (req, res) => {
  // Check if the user has permission to view products
  if (!req.user.permissions.viewProducts) {
    return res.status(403).json({ error: 'Unauthorized to view products' });
  }

  try {
    // Add the logic to fetch and return all products here
    // ...
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};



// ... other exports
