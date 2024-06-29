const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name must be provided"],
    },
    details: {
        type: String,
        required: [true, "Product details must be provided"],
    },
    img: [
        {
            url: { type: String, required: true },
            alt: { type: String, default: '' } // Optional, can be adjusted based on your needs
        }
    ],
    mrp: {
        type: Number,
        required: [true, "MRP must be provided"],
        min: [0, "MRP must be a positive number"],
    },
    price: {
        type: Number,
        required: [true, "Price must be provided"],
        min: [0, "Price must be a positive number"],
    },
    discount: { type: Number, default: 0 },
    rating: {
        type: Number,
        required: [true, "Rating must be provided"],
        min: [0, "Rating must be at least 0"],
        max: [5, "Rating cannot be more than 5"],
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    company: {
        type: String,
        enum: {
            values: ["JENIX"],
            message: "{VALUE} is not supported",
        },
    }
});

// Define the main schema with categories
const categorySchema = new mongoose.Schema({
    company: {
        type: String,
        enum: {
            values: ["JENIX"],
            message: "{VALUE} is not supported",
        },
    },
    categories: {
        type: Map,
        of: [productSchema]
    }
});

module.exports = mongoose.model("Category", categorySchema);
