# Dự án Website Đặt xe Ô tô

Chào mừng các bạn đến với dự án **Website Đặt xe Ô tô**! Dự án này được xây dựng với mục tiêu cung cấp một nền tảng đặt mua xe trực tuyến dễ dàng và thuận tiện cho người dùng.

## 🌟 Video Demo Website Đặt xe Ô tô
[![Video Demo](https://img.youtube.com/vi/HWUtAkvGaCI/0.jpg)](https://youtu.be/HWUtAkvGaCI)

## Một số giao diện Website
1. Trang chủ
![image](https://github.com/user-attachments/assets/bde86cfc-2f88-4e49-9445-16df58b16e3a)
![image](https://github.com/user-attachments/assets/7a5d87bb-d540-47c1-a428-803b1bc953ae)
![image](https://github.com/user-attachments/assets/8812856e-6a59-45cf-a33f-444766aa0925)


## Hướng dẫn chạy dự án

Dưới đây là các bước để bạn có thể chạy dự án trên máy tính của mình:

### Bước 1: Cài đặt và cấu hình cơ sở dữ liệu
1. Mở MySQL và import file database có đuôi `.sql` vào cơ sở dữ liệu của bạn.

### Bước 2: Cài đặt Laravel
2. Mở terminal mới và di chuyển đến thư mục Back-end Laravel, sau đó chạy lệnh sau để cài đặt các phụ thuộc:
    ```bash
     composer install
     ```

### Bước 3: Cấu hình kết nối cơ sở dữ liệu
3. Mở file `.env` trong thư mục `Backend_laravel` và chỉnh sửa biến `DB_CONNECTION` để phù hợp với cấu hình cơ sở dữ liệu của bạn.

### Bước 4: Khởi chạy Backend (Laravel)
4. Mở terminal và di chuyển đến thư mục `Backend_laravel`, sau đó chạy lệnh sau để khởi chạy server Laravel:
   ```bash
   php artisan serve --port=8099
### Bước 5: Cài đặt Frontend (React)
5. Mở terminal mới và di chuyển đến thư mục Front-end react, sau đó chạy lệnh sau để cài đặt các phụ thuộc:
     ```bash
     cd fontend-admin
     npm install
     ```

### Bước 6: Khởi chạy Frontend (React)
6. Sau khi cài đặt xong, chạy lệnh sau trong từng thư mục để khởi chạy ứng dụng React:
   ```bash
   npm start
