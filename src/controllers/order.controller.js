const sendOrderToKafka = require("../producers/order.producer");

const createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;

    if (!userId || !products || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = { userId, products, totalAmount, status: "pending" };

    sendOrderToKafka(order);

    res.status(200).json({ message: "Order received and is being processed" });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createOrder };
