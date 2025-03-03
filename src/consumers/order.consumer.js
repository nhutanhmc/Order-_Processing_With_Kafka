const connectDB = require("../config/database"); // Import kết nối MongoDB
const Order = require("../models/order.model");
const { consumer } = require("../config/kafka");

// Hàm khởi động Consumer sau khi MongoDB kết nối
const startConsumer = async () => {
  await connectDB(); // Chờ MongoDB kết nối trước
  console.log("✅ MongoDB connected, starting Kafka Consumer...");

  consumer.on("message", async (message) => {
    try {
      const orderData = JSON.parse(message.value);
      console.log("📩 Processing order event:", orderData);

      // Đảm bảo có `quantity`, tránh lỗi validation
      orderData.products = orderData.products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity || product.stock || 1,
      }));

      const newOrder = new Order(orderData);
      await newOrder.save();

      console.log("✅ Order saved to MongoDB:", newOrder);
    } catch (error) {
      console.error("❌ Error processing order:", error);
    }
  });
};

startConsumer();
