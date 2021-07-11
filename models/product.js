const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    creator: {
        type: Object,
        required: false
    },
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } });

module.exports = mongoose.model('Product', productSchema);