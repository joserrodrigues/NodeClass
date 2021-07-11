const { validationResult } = require('express-validator');

exports.getProducts = (req, res, next) => {
    console.log("Getting product");
    res.status(200).json({
        products: [
            {
                title: 'Maquina de Lavar',
                type: 'Eletrodomestico'
            }
        ]
    })
}

exports.getProduct = (req, res, next) => {
    console.log("Adding product");
    const postId = req.params.postId;
    res.status(200).json({
        codeInfo: {
            id: 1,
            message: "Get Product successfully",
        },
        post: {
            id: postId,
            title: "Maquina de Lavar",
            type: "Eletrodomestico",
        }
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
    const type = req.body.type;
    res.status(200).json({
        codeInfo: {
            id: 1,
            message: "Product created successfully",
        },
        post: {
            id: '12312',
            title: title,
            type: type,
        }
    });
}