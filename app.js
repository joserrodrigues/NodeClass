const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const manageProductsRoutes = require('./routes/manageProducts');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded
app.use(express.json())// json
app.use(cors())

app.use('/manageProducts', manageProductsRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect('mongodb+srv://root:lWb1qzDZdoSLxJkl@cluster0.vdqdy.mongodb.net/products?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    app.listen(80);
})
.catch(err => {
    console.log(err);
})
