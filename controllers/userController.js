const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Ensure you have jwt
const Product = require('../models/Product');
const ProductType = require('../models/ProductType');




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

    // Set the user's role in the response
    // let message = 'Logged in as user'; // Default message for non-admin users
    // if (user.role === 'admin') {
    //   message = 'Logged in as admin'; // Set message for admin users
    // }
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
      role: user.role, // Include the user's role
      message: user.role === 'admin' ? 'Logged in as admin' : 'Logged in as user',    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


// userController.js

// Function to add a product
// Function to add a product
// Function to add a product
exports.addProduct = async (req, res) => {
  const { name, quantity, description, productType } = req.body;
  console.log('Received request to add a product:', { name, quantity, description, productType });

  try {
    let productTypeId;

    // Check if the provided productType exists
    const existingProductType = await ProductType.findOne({ name: productType });

    if (existingProductType) {
      productTypeId = existingProductType._id;
    } else {
      // If it doesn't exist, create a new product type
      const newProductType = new ProductType({ name: productType });
      const savedProductType = await newProductType.save();
      productTypeId = savedProductType._id;
    }

    const product = new Product({ name, quantity, description, productType: productTypeId });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(400).json({ error: 'Error adding product' });
  }
};


// Similar changes for deleteProduct, updateProduct, and viewProducts


// Function to delete a product
// Function to delete a product
exports.deleteProduct = async (req, res) => {
  // Check if the user has permission to delete products
  if (!req.user.permissions.deleteProduct) {
    return res.status(403).json({ error: 'Unauthorized to delete products' });
  }

  const { id } = req.params;

  try {
    // Add the product deletion logic here (e.g., deleting from the database)
    // ...
    await Product.findByIdAndDelete(id);


    // Respond with an HTTP status code indicating success (204 No Content) since there's no response body for successful deletion
    res.status(204).send();
  } catch (error) {
    // If there's an error during product deletion, respond with an error message and a suitable HTTP status code (e.g., 400 Bad Request)
    res.status(400).json({ error: 'Error deleting product' });
  }
};



// Function to update a product
// Function to update a product
exports.updateProduct = async (req, res) => {

  // Check if the user has permission to update products
  if (!req.user.permissions.updateProduct) {
    return res.status(403).json({ error: 'Unauthorized to update products' });
  }

  const { id } = req.params;
  const { name, quantity, description, productType } = req.body;

  try {
    // Add the product update logic here (e.g., updating in the database)
    // ...
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, quantity, description, productType },
      { new: true }
    );

    // Respond with a success message and an HTTP status code indicating success (200 OK)
    res.status(200).json({updatedProduct, message: 'Product updated successfully' });
  } catch (error) {
    // If there's an error during product update, respond with an error message and a suitable HTTP status code (e.g., 400 Bad Request)
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

// Fetch user-specific product types data
exports.getUserProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.find();
    res.status(200).json(productTypes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product types' });
  }
};




// ... other exports
