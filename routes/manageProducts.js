const express = require('express');

const productController = require('../controllers/product');
const { body } = require('express-validator');

const router = express.Router();

// GET /manageProducts/products
router.get('/products', productController.getProducts);

// GET /manageProducts/product/:postId
router.get('/product/:prodId', productController.getProduct);

// POST /manageProducts/product
router.post('/product', [
    body('title').trim().isLength({ min: 7 }),
    body('type').trim().isLength({ min: 7 }),
], productController.addProduct);

// PUT /manageProducts/product
router.put('/product/:prodId', [
    body('title').trim().isLength({ min: 7 }),
    body('type').trim().isLength({ min: 7 }),
], productController.updateProduct);

// DELETE /manageProducts/product
router.delete('/product/:prodId', productController.deleteProduct);

module.exports = router;