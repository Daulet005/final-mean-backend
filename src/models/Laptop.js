const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        enum: ['Asus', 'Lenovo', 'Apple', 'HP', 'Dell', 'Acer']
    },
    processor: {
        type: String,
        required: [true, 'Processor is required']
    },
    ram: {
        type: String,
        required: [true, 'RAM is required']
    },
    storage: {
        type: String,
        required: [true, 'Storage is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be positive']
    },
    images: {
        type: [String],
        required: [true, 'At least one image URL is required'],
        validate: {
            validator: (arr) => arr.length > 0,
            message: 'At least one image is required',
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [1000, 'Description too long']
    }
}, { timestamps: true });

module.exports = mongoose.model('Laptop', laptopSchema);