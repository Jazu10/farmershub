const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");

const errorMiddleware = require("./middlewares/errors");

// // Setting up config file
// if (process.env.NODE_ENV !== "PRODUCTION")
//     require("dotenv").config({ path: "backend/config/config.env" });
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());

// Import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
