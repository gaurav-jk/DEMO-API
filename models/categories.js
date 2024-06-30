const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    img: [
        {
            url: { type: String, required: true },
            alt: { type: String, default: '' }
        }
    ],
    mrp: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    discount: { type: Number, default: 0 },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    company: {
        type: String,
        enum: {
            values: ["JENIX"],
            message: "{VALUE} is not supported",
        },
    }
});

// Define the category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    products: [productSchema], // Embedding products within categories
    company: {
        type: String,
        enum: {
            values: ["JENIX"],
            message: "{VALUE} is not supported",
        },
    }
});

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);
