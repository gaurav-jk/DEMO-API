const { query } = require("express");
const Product = require("../models/product")
// const getAllProducts = async (req,res) =>{
//     const { name} = req.query;
//     const queryObject = {};
//     if (name) {
//         queryObject.name = name;
//         console.log(queryObject);
//     }

// Fetch a product by all product
const getAllProducts = async (req,res) =>{
const {company, name,featured ,sort,select } = req.query;
const queryObject = {};
        if (company) {
            queryObject.company = company;
        }
        if (featured) {
            queryObject.featured = featured;
        }

        if (name) {
            queryObject.name = { $regex:name, $options: "i"};
        }

        let apiData = Product.find(queryObject);

        if (sort) {
            let sortFix = sort.split(",").join(" ");
            apiData = apiData.sort(sortFix);
        }
        if (select) {
            // let selectFix = select.replace(","," ");
            let selectFix = select.split(",").join(" ");
            apiData = apiData.select(selectFix);
        }

        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        let skip = (page - 1) * limit;
        apiData = apiData.skip(skip).limit(limit)

        console.log(queryObject);
    
    // const products = await Product.find(queryObject).sort(sort);
    const products = await apiData;
    res.status(200).json({ products, nbHits: products.length});
};

// Fetch a product by ID
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fetch a product by testing
const getAllProductsTesting = async (req,res) =>{
    const myData = await Product.find(req.query).skip(2);
    // const myData = await Product.find(req.query).select("name");
    // const myData = await Product.find(req.query).select("name company");
    // const myData = await Product.find(req.query).sort("name -price");
    // console.log(" 🚀 ~ file: products.js ~ line 10 ~ getAllProductsTesting ~ req.query",req.query);
    res.status(200).json({ myData});
};

module.exports = {getAllProducts,getAllProductsTesting, getProductById,}; 