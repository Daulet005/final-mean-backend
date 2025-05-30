// models/CartItem.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    laptopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Laptop',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

module.exports = mongoose.model('CartItem', cartItemSchema);
