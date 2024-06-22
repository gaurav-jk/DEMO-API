require ("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect")
const products_routes = require("./routes/products")
const PORT = process.env.PORT || 5000;

// Middleware to enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // or specify a domain instead of '*'
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true'); // if credentials are needed
// Handle preflight requests
if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    } else {
    next();
    }
});

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
