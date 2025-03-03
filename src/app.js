const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", orderRoutes);
app.use("/api", productRoutes);
module.exports = app;
