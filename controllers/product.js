const Product = require('../models/product');

const { validationResult } = require('express-validator');

exports.getProducts = (req, res, next) => {
    console.log("Getting products");

    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;

    Product.find().countDocuments()
    .then(count => {
        totalItems = count;
        return Product.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
    })
    .then(products => {
        res.status(200).json({
            products: products
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        throw err;
    });
}

exports.getProduct = (req, res, next) => {
    console.log("Getting product");
    const prodId = req.params.prodId;
    Product.findById(prodId)
    .then(product => {
        res.status(200).json({
            product: product
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        throw err;
    });
}

exports.addProduct = (req, res, next) => {
    console.log("Adding product");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const title = req.body.title;
    const type = req.body.type;
    const product = new Product({
        title: title,
        type: type
    })

    product.save().then(result => {
        console.log(result);
        res.status(200).json({
            codeInfo: {
                id: 1,
                message: "Product create successfull",
            },
            product: product
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        throw err;
    })
}

exports.updateProduct = (req, res, next) => {
    console.log("Adding product");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const prodId = req.params.prodId;
    const title = req.body.title;
    const type = req.body.type;

    Product.findById(prodId)
    .then(product => {
        if (!product) {
            console.log("Error not found")
        } else {
            product.title = title;
            product.type = type;
            updatedProduct = product;
            return product.save();
        }
    })
    .then(result => {
        res.status(200).json({
            product: updatedProduct
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        throw err;
    });
}

exports.deleteProduct = (req, res, next) => {
    console.log("Getting product");
    const prodId = req.params.prodId;
    Product.findByIdAndRemove(prodId)
    .then(result => {
        console.log('DESTROYED PRODUCT');
        res.status(200).json({
            info: {
                code: 1,
                message: "Remove Successfully"
            }
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        throw err;
    });
}
