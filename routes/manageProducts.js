const express = require('express');

const authMiddleware = require('../middleware/auth');
const productController = require('../controllers/product');
const { body } = require('express-validator');

const router = express.Router();

// GET /manageProducts/products
router.get('/products', authMiddleware, productController.getProducts);

// GET /manageProducts/product/:postId
router.get('/product/:prodId', authMiddleware, productController.getProduct);

// POST /manageProducts/product
router.post('/product', authMiddleware, [
    body('title').trim().isLength({ min: 7 }),
    body('type').trim().isLength({ min: 7 }),
], productController.addProduct);

// PUT /manageProducts/product
router.put('/product/:prodId', authMiddleware, [
    body('title').trim().isLength({ min: 7 }),
    body('type').trim().isLength({ min: 7 }),
], productController.updateProduct);

// DELETE /manageProducts/product
router.delete('/product/:prodId', authMiddleware, productController.deleteProduct);

module.exports = router;