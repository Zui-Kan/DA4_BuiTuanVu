# Dự án Website Đặt xe Ô tô

Chào mừng các bạn đến với dự án **Website Đặt xe Ô tô**! Dự án này được xây dựng với mục tiêu cung cấp một nền tảng đặt xe trực tuyến dễ dàng và thuận tiện cho người dùng.

## Hướng dẫn chạy dự án

Dưới đây là các bước để bạn có thể chạy dự án trên máy tính của mình:

### Bước 1: Cài đặt và cấu hình cơ sở dữ liệu
1. Mở MySQL và import file database có đuôi `.sql` vào cơ sở dữ liệu của bạn.

### Bước 2: Cấu hình kết nối cơ sở dữ liệu
2. Mở file `.env` trong thư mục `Backend_laravel` và chỉnh sửa biến `DB_CONNECTION` để phù hợp với cấu hình cơ sở dữ liệu của bạn.

### Bước 3: Khởi chạy Backend (Laravel)
3. Mở terminal và di chuyển đến thư mục `Backend_laravel`, sau đó chạy lệnh sau để khởi chạy server Laravel:
   ```bash
   php artisan serve --port=8099
### Bước 4: Cài đặt Frontend (React)
4. Mở terminal mới và di chuyển đến thư mục Front-end react, sau đó chạy lệnh sau để cài đặt các phụ thuộc:
   - Đối với thư mục đầu tiên:
     ```bash
     cd fontend-admin
     npm install
     ```
   - Đối với thư mục thứ hai :
     ```bash
     cd fontend-user
     npm install
     ```

### Bước 5: Khởi chạy Frontend (React)
5. Sau khi cài đặt xong, chạy lệnh sau trong từng thư mục để khởi chạy ứng dụng React:
   ```bash
   npm start
