# 📦 Order Processing With Kafka & Node.js

🚀 **Ứng dụng xử lý đơn hàng sử dụng Node.js, Express, MongoDB và Apache Kafka để đảm bảo khả năng mở rộng, xử lý bất đồng bộ và tối ưu hiệu suất.** 

---

## 🔥 Tại sao sử dụng Kafka?

Apache Kafka là một hệ thống xử lý stream dữ liệu thời gian thực, cho phép các service giao tiếp với nhau thông qua **Event-driven Architecture**. 

### ✅ **Ưu điểm của Kafka so với giao tiếp API thông thường**
1. **Event-driven Communication** 🔁  
   - Không cần REST API gọi trực tiếp giữa các service.
   - Khi Order service nhận đơn hàng, nó gửi event vào Kafka.
   - Consumer lắng nghe Kafka, xử lý và lưu vào database.

2. **Đồng bộ dữ liệu giữa các hệ thống** 🔄  
   - Nếu có nhiều hệ thống cần dữ liệu (Payment, CRM, Logistics...), Kafka giúp tất cả hệ thống cập nhật tức thì mà không cần gọi API.

3. **Dữ liệu không bị mất** 🛡️  
   - Kafka lưu dữ liệu trong **log retention**, nếu database gặp sự cố, consumer có thể đọc lại dữ liệu từ Kafka mà không mất đơn hàng nào.

---

## 📚 **Cách Kafka hoạt động trong dự án này**
### 1️⃣ **Producer (API gửi dữ liệu vào Kafka)**
   - Khi user tạo **Order**, dữ liệu sẽ gửi vào **Kafka Topic** (`order_created`).
   - Khi user tạo **Product**, dữ liệu sẽ gửi vào **Kafka Topic** (`product_events`).

### 2️⃣ **Broker (Hệ thống xử lý Kafka)**
   - Kafka Broker là trung gian giúp lưu trữ **message queue**, cho phép nhiều Consumer đọc dữ liệu song song.

### 3️⃣ **Consumer (Service nhận & xử lý dữ liệu từ Kafka)**
   - `order.consumer.js` → Nhận sự kiện `order_created` & lưu đơn hàng vào MongoDB.
   - `product.consumer.js` → Nhận sự kiện `product_events` & thực hiện CRUD sản phẩm trong MongoDB.

---

## ⚙️ **Cài đặt & chạy dự án**
### 🛠 **1️⃣ Yêu cầu**
- Node.js 16+
- MongoDB Atlas (hoặc MongoDB local)
- Apache Kafka đã cài đặt **(chạy trên localhost:9092)**

### 📥 **2️⃣ Clone repo**
```sh
git clone https://github.com/nhutanhmc/Order-_Processing_With_Kafka.git
cd Order-_Processing_With_Kafka
