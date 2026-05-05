# 🧪 Kinetic Quiz - Hệ Thống Trắc Nghiệm Hóa Học

Hệ thống quản lý và làm bài thi trắc nghiệm hóa học trực tuyến, được xây dựng với kiến trúc hiện đại, hỗ trợ Giáo viên quản lý ngân hàng câu hỏi và Học sinh luyện tập kiến thức.

## 🚀 Công Nghệ Sử Dụng

- **Backend:** Laravel 11 (Layered Architecture: Controller -> Service -> Repository)
- **Frontend:** React.js, Vite, Tailwind CSS
- **Database:** MySQL (Hosted on Railway)
- **Authentication:** Laravel Sanctum

## 🛠️ Hướng Dẫn Cài Đặt

### 1. Yêu Cầu Hệ Thống
- PHP >= 8.2
- Node.js >= 18
- Composer

### 2. Thiết Lập Backend (BE)
```bash
# Di chuyển vào thư mục backend
cd BE

# Cài đặt các thư viện PHP
composer install

# Tạo file cấu hình môi trường (Nếu chưa có file .env)
# Nếu đã có file .env từ nhóm cung cấp, hãy bỏ qua bước này
cp .env.example .env

# Tạo mã khóa ứng dụng (Nếu .env chưa có APP_KEY)
php artisan key:generate

# Chạy server
php artisan serve
```

### 3. Thiết Lập Frontend (FE)
```bash
# Di chuyển vào thư mục frontend
cd FE/chemquiz

# Cài đặt các thư viện Node
npm install

# Chạy ứng dụng ở chế độ phát triển
npm run dev
```

## 📐 Kiến Trúc Hệ Thống (Layered Architecture)

Dự án được cấu trúc theo mô hình phân lớp để đảm bảo tính dễ bảo trì và mở rộng:
- **Controllers:** Chỉ xử lý yêu cầu HTTP và điều phối dữ liệu.
- **Services:** Chứa logic nghiệp vụ (Business Logic) cốt lõi của hệ thống.
- **Repositories:** Quản lý việc truy xuất và thao tác trực tiếp với Database thông qua Eloquent.

## 🌟 Các Tính Năng Chính

- **Học sinh:** Xem danh sách đề thi, làm bài trực tuyến, xem lịch sử và phân tích kết quả học tập.
- **Giáo viên:** Quản lý ngân hàng câu hỏi, tạo đề thi thủ công hoặc tự động theo tiêu chí, quản lý kết quả thi của học sinh.
- **Admin:** Thống kê tổng quan hệ thống, quản lý người dùng và cấu hình ứng dụng.
- **Hồ sơ:** Cập nhật thông tin cá nhân và mật khẩu cho mọi vai trò.

## 📝 Ghi Chú
- Hệ thống hiện đang kết nối với Database trực tuyến trên **Railway**. Nếu muốn dùng Database local, hãy thay đổi các thông số `DB_*` trong file `.env`.
- Đảm bảo Backend đang chạy ở cổng `8000` để Frontend có thể kết nối API thành công.

---
*Phát triển bởi đội ngũ 5 Nàng Tiên 🧚‍♀️*
