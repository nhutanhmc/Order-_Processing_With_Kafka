const { producer } = require("../config/kafka");

const sendOrderToKafka = (order) => {
  const payloads = [{ topic: "order_created", messages: JSON.stringify(order) }];

  producer.send(payloads, (err, data) => {
    if (err) {
      console.error("❌ Kafka Producer Error:", err);
    } else {
      console.log("✅ Order sent to Kafka:", data);
    }
  });
};

module.exports = sendOrderToKafka;
