const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });

const producer = new kafka.Producer(client);
const consumer = new kafka.Consumer(
  client,
  [
    { topic: "order_created", partition: 0 },
    { topic: "product_events", partition: 0 }, // Lắng nghe topic product_events
  ],
  {
    autoCommit: true,
  }
);

producer.on("ready", () => {
  console.log("✅ Kafka Producer is ready");
});

producer.on("error", (err) => {
  console.error("❌ Kafka Producer error:", err);
});

consumer.on("message", (message) => {
  try {
    const parsedMessage = JSON.parse(message.value);
    console.log("📩 Received message:", parsedMessage);

    if (message.topic === "product_events") {
      console.log("🔄 Processing product event:", parsedMessage);
      // Xử lý event của product (nếu cần)
    } else if (message.topic === "order_created") {
      console.log("🛒 Processing order event:", parsedMessage);
      // Xử lý event của order (nếu cần)
    }
  } catch (error) {
    console.error("❌ Error processing Kafka message:", error);
  }
});


module.exports = { producer, consumer };
