const { producer } = require("../config/kafka");

const sendProductToKafka = (action, product) => {
    const payloads = [
        {
          topic: "product_events",
          messages: JSON.stringify({ action, product }),
          partition: 0, // Đảm bảo gửi vào partition 0
        },
      ];
      
      producer.send(payloads, (err, data) => {
        if (err) {
          console.error("❌ Kafka Producer Error:", err);
        } else {
          console.log(`✅ Kafka Producer gửi thành công:`, JSON.stringify(payloads, null, 2));
          console.log("📩 Kafka Response:", data);
        }
      });
      
};

module.exports = sendProductToKafka;
