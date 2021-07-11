const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        required: true
    }]
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } });

module.exports = mongoose.model('User', userSchema);