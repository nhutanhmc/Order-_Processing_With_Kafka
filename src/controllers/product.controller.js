const Product = require("../models/product.model");
const sendProductToKafka = require("../producers/product.producer");

const createProduct = async (req, res) => {
  try {
    const { name, price, stock, category } = req.body;

    if (!name || !price || !stock || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = { name, price, stock, category };
    sendProductToKafka("create", product);

    res.status(200).json({ message: "Product creation requested" });
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    sendProductToKafka("update", { _id: id, ...updates });

    res.status(200).json({ message: "Product update requested" });
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    sendProductToKafka("delete", { _id: id });

    res.status(200).json({ message: "Product deletion requested" });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
