const express = require('express');
const cors = require('cors')

const manageProductsRoutes = require('./routes/manageProducts');

const app = express();

const sequelize = require('./util/database');
const Product = require('./models/product');
const Type = require('./models/type');

app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded
app.use(express.json())// json
app.use(cors())

app.use('/manageProducts', manageProductsRoutes);

Product.belongsTo(Type, { Constraints: true, onDelete: 'CASCADE' });
Type.hasMany(Product);

sequelize.sync().then(result => {    
    app.listen(80);
}).catch(err => {
    console.log(err);
});