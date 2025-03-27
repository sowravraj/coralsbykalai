const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth-route")
const adminProductsRouter = require("./routes/admin/admin-route")
const shopProductsRouter = require("./routes/shop/shop-routes")
const shopCartRouter = require("./routes/shop/cart-routes")

dotenv.config(); // Load environment variables

const app = express(); // Create an instance of the Express application

//connect to a database
mongoose.connect("mongodb+srv://sowravraj:NFMSplGXZCkmHRG3@cluster0.w4c8m.mongodb.net/kalai")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("Connection error", err);
    });

// Middleware
app.use(express.json()); // Enable parsing of JSON requests
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials:true
})); // Enable CORS if needed

const PORT = process.env.PORT || 3000;

// Log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.options('*', cors()); // Handle preflight requests for all routes


app.use("/api/auth",authRouter)
app.use("/api/admin/products",adminProductsRouter)
app.use("/api/shop/products",shopProductsRouter)
app.use("/api/shop/cart",shopCartRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
