const express = require("express");
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/product.controller");

const router = express.Router();

router.post("/product", createProduct);
router.get("/product", getProducts);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;
