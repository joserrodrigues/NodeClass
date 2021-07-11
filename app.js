const express = require('express');
const cors = require('cors')

const manageProductsRoutes = require('./routes/manageProducts');

const app = express();

app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded
app.use(express.json())// json
app.use(cors())

app.use('/manageProducts', manageProductsRoutes);

app.listen(80);