const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not Auth');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];
    let dToken;
    try {
        dToken = jwt.verify(token, 'dso8icujikl12j3kl134das');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    if (!dToken) {
        const error = new Error('Not Auth');
        error.statusCode = 401;
        throw error;
    }

    req.userId = dToken.userId;
    next();
}