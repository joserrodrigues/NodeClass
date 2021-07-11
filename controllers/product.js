const { validationResult } = require('express-validator');
const Product = require('../models/product');
const Type = require('../models/type');

exports.getProducts = (req, res, next) => {
    console.log("Getting products");

    Product.findAll({ include: ['type'] }).then(products => {
        res.status(200).json({
            products: products
        })
    }).catch(err => {
        console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
    console.log("Getting product");
    const prodId = req.params.prodId;

    Product.findByPk(prodId, { include: ['type'] })
    .then(products => {
        res.status(200).json({
            products: products
        })
    }).catch(err => {
        console.log(err);
    });
}

exports.addProduct = (req, res, next) => {
    console.log("Adding product");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        })
    }

    const title = req.body.title;
    const typeName = req.body.type;
    
    Type.findOne({
        where: {
            title: typeName
        }
    })
    .then(type => {
        console.log(type);
        if(!type){
            return Type.create({ title: typeName });
        }
        return type;
    })
    .then(type => {
        console.log(type);
        return type.createProduct({ title: title });
    })
    .then(product => {
        res.status(200).json({
            product: product
        });

    }).catch (err => {
        console.log(err);
    });    
}

exports.updateProduct = (req, res, next) => {
    console.log("Updating  product");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        })
    }

    const prodId = req.params.prodId;
    const title = req.body.title;
    const typeName = req.body.type;
    let productInfo;

    Product.findByPk(prodId)
    .then(product => {
        console.log(product);        
        if (!product) {
            res.status(422).json({
                message: 'Product not found'
            });
        }
        productInfo = product;
        return Type.findOne({
            where: {
                title: typeName
            }
        });
    })
    .then(type => {
        console.log(type);
        if (!type) {
            return Type.create({ title: typeName });
        }
        return type;
    })
    .then(type => {
        productInfo.title = title;
        productInfo.typeId = type.id;
        
        return productInfo.save();
    })
    .then(product => {
        res.status(200).json({
            product: product
        });

    }).catch(err => {
        console.log(err);
    });
}

exports.deleteProduct = (req, res, next) => {
    console.log("Deleting product");
    const prodId = req.params.prodId;

    Product.findByPk(prodId)
    .then(product => {
        if (!product) {
            res.status(422).json({
                message: 'Product not found'
            });
        }
        return product.destroy();
    })
    .then(result => {
        console.log('DESTROYED PRODUCT');
        res.status(200).json({
            message: "Product deleted successfully"
        });
    })
    .catch(err => console.log(err));
}