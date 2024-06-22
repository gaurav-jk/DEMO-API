const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name must be provided"],
    },
    details: {
        type: String,
        required: [true, "Product details must be provided"],
    },
    img:  [
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
            // values: ["ikea", "liddy", "caressa", "marcos"],
            values: ["JENIX"],
            message: "{VALUE} is not supported",
        },
        },
});

module.exports = mongoose.model("Product",productSchema);