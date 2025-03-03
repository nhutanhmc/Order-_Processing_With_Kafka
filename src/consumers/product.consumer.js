const connectDB = require("../config/database"); // Import hàm connectDB
const Product = require("../models/product.model");
const { consumer } = require("../config/kafka");

// Gọi kết nối MongoDB trước khi khởi chạy Consumer
const startConsumer = async () => {
  await connectDB(); // Chờ MongoDB kết nối thành công
  console.log("✅ MongoDB connected, starting Kafka Consumer...");

  consumer.on("message", async (message) => {
    try {
      const { action, product } = JSON.parse(message.value);
      console.log("📩 Processing product event:", action, product);

      switch (action) {
        case "create":
          await new Product(product).save();
          console.log("✅ Product created in MongoDB:", product);
          break;
        case "update":
          await Product.findByIdAndUpdate(product._id, product);
          console.log("✅ Product updated in MongoDB:", product);
          break;
        case "delete":
          await Product.findByIdAndDelete(product._id);
          console.log("✅ Product deleted in MongoDB:", product._id);
          break;
        default:
          console.warn("⚠️ Unknown action:", action);
      }
    } catch (error) {
      console.error("❌ Error processing product event:", error);
    }
  });
};

startConsumer();
