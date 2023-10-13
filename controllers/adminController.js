// adminController.js

const User = require('../models/User');
const ProductType = require('../models/ProductType');
const Product = require('../models/Product');

// Admin action to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Admin action to get all product types
exports.getAllProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.find();
    res.status(200).json(productTypes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product types' });
  }
};

// Admin action to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Admin action to add a new product type
// Admin action to add a new product type
exports.addProductType = async (req, res) => {
  const { name } = req.body;
  try {
    console.log('Adding product type:', name);
    const productType = new ProductType({ name });
    await productType.save();
    res.status(201).json(productType);
  } catch (error) {
    res.status(400).json({ error: 'Error adding product type' });
  }
};


// Admin action to update a product type
exports.updateProductType = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedProductType = await ProductType.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json(updatedProductType);
  } catch (error) {
    res.status(400).json({ error: 'Error updating product type' });
  }
};

// Admin action to delete a product type
exports.deleteProductType = async (req, res) => {
  const { id } = req.params;
  try {
    await ProductType.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting product type' });
  }
};

// Similar actions for adding, updating, and deleting products can be implemented

// adminController.js

// ~~~~~~~~~~~~~~~~~~~PRODUCT ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ... Previous admin actions as shown in the previous response ...

// Admin action to add a new product
exports.addProduct = async (req, res) => {
  const { name, quantity, description, productType } = req.body;
  try {
    const product = new Product({ name, quantity, description, productType });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Error adding product' });
  }
};

// Admin action to update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, description, productType } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, quantity, description, productType },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error updating product' });
  }
};

// Admin action to delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting product' });
  }
};
