const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

// Route for registration
router.post('/register', userController.register);
router.post('/login', userController.login);

// Route to add a product, protected by verifyToken middleware
router.post('/products', verifyToken, userController.addProduct);

// Route to delete a product, protected by verifyToken middleware
router.delete('/products/:id', verifyToken, userController.deleteProduct);

// Route to update a product, protected by verifyToken middleware
router.put('/products/:id', verifyToken, userController.updateProduct);

// Route to view all products, protected by verifyToken middleware
router.get('/products', verifyToken, userController.viewProducts);

// Route to fetch user-specific product types, protected by verifyToken middleware
router.get('/product-types', verifyToken, userController.getUserProductTypes);

module.exports = router;
