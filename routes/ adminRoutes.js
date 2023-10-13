// adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAdmin = require('../middlewares/isAdmin');

// Protect all admin routes with the isAdmin middleware
router.use(isAdmin);

// Admin routes
router.get('/users', adminController.getAllUsers);
router.get('/product-types', adminController.getAllProductTypes);
router.get('/products', adminController.getAllProducts);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);
router.post('/product-types', adminController.addProductType);
router.put('/product-types/:id', adminController.updateProductType);
router.delete('/product-types/:id', adminController.deleteProductType);

// Similar routes for managing products can be added

module.exports = router;
