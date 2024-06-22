require ("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect")
const products_routes = require("./routes/products")
const PORT = process.env.PORT || 5000;

// Middleware to serve static files (images)
app.use('/images', express.static('images'));


app.get("/", (req, res) => {
    res.send("hi, I am live");
});
//middleware or to set router
app.use("/api/products", products_routes);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT} YES I AM CONNECTED`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
