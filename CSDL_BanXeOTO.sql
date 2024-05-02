CREATE DATABASE DA3_BANXEOTO
GO
USE DA3_BANXEOTO
GO

-- Bảng chứa thông tin về người dùng
CREATE TABLE TaiKhoan (
    MaTaiKhoan INT PRIMARY KEY IDENTITY,
    TenTaiKhoan VARCHAR(100),
    Email VARCHAR(255),
    SDT varchar(20),
	MatKhau varchar(100),
	Quyen int,
    AnhDaiDien nvarchar(250)
);

-- Bảng chứa thông tin về loại xe
CREATE TABLE LoaiXe (
    MaLoaiXe INT PRIMARY KEY IDENTITY,
    TenLoaiXe NVARCHAR(100) NOT NULL
);

-- Bảng chứa thông tin về các hãng xe
CREATE TABLE HangXe (
    MaHang INT PRIMARY KEY IDENTITY ,
    TenHang NVARCHAR(100) NOT NULL
);


-- Bảng chứa thông tin về các mẫu xe
CREATE TABLE ModelXe (
    MaModel INT PRIMARY KEY IDENTITY,
    TenModel NVARCHAR(100) NOT NULL,
    MaHang INT,
    MaLoaiXe INT,
    NamSanXuat INT,
    Gia DECIMAL(10, 2),
	HinhAnhXe nvarchar(max),
	MoTa nvarchar(max),
    FOREIGN KEY (MaHang) REFERENCES HangXe(MaHang),
    FOREIGN KEY (MaLoaiXe) REFERENCES LoaiXe(MaLoaiXe)
);

-- Bảng chứa thông tin về các chi tiết kỹ thuật của xe
CREATE TABLE ThongSoKyThuatXe (
    MaThongSo INT PRIMARY KEY IDENTITY,
    MaModel INT,
	PhienBanXe nvarchar(50),
    LoaiDongCo NVARCHAR(50),
    LoaiHieuDong NVARCHAR(50),
	MauSac nvarchar(max),
    CongSuat INT,
    MoMenXoan INT,
    LoaiNhienLieu NVARCHAR(50),
    FOREIGN KEY (MaModel) REFERENCES ModelXe(MaModel)
);

CREATE TABLE NhanVien (
    MaNhanVien INT PRIMARY KEY IDENTITY,
	MaTaiKhoan int unique,
    TenNhanVien NVARCHAR(100) NOT NULL,
    ChucVu NVARCHAR(100),
    DiaChi NVARCHAR(255),
    SoDienThoai NVARCHAR(20),
    Luong DECIMAL(10, 2),
    FOREIGN KEY (MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan)

);
-- Bảng chứa thông tin về người dùng
CREATE TABLE KhachHang (
    MaKhachHang INT PRIMARY KEY IDENTITY,
	MaTaiKhoan int unique,
    TenNguoiDung NVARCHAR(100),
    Email VARCHAR(255),
    CMND VARCHAR(20),
    SDT varchar(20),
    FOREIGN KEY (MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan)

);
CREATE TABLE NhaCungCap (
    MaNhaCungCap INT PRIMARY KEY IDENTITY,
    TenNhaCungCap NVARCHAR(100) NOT NULL,
    DiaChi NVARCHAR(255),
    SoDienThoai NVARCHAR(20)
);
CREATE TABLE PhuTung (
    MaPhuTung INT PRIMARY KEY IDENTITY,
    TenPhuTung NVARCHAR(100) NOT NULL,
    Gia DECIMAL(10, 2),
    SoLuong INT
);


-- Bảng chứa thông tin liên quan đến việc bán xe
CREATE TABLE HoaDonBanXe (
    MaBanXe INT PRIMARY KEY IDENTITY,
    MaNhanVien INT,
	MaKhachHang int,
    NgayBan DATE,
	TongTien  DECIMAL(10, 2),
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien),
    FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang),
    -- Giả sử MaNguoiBan tham chiếu đến một bảng chứa thông tin người bán
);
create table ChiTietBanXe(
MaChiTietBanXe int primary key identity,
MaBanXe int,
MaModel INT,
MaThongSo int,
MauSac nvarchar(50),
    SoLuong INT,

GiaBan DECIMAL(10, 2),
    FOREIGN KEY (MaBanXe) REFERENCES HoaDonBanXe(MaBanXe),
    FOREIGN KEY (MaModel) REFERENCES ModelXe(MaModel),
    FOREIGN KEY (MaThongSo) REFERENCES ThongSoKyThuatXe(MaThongSo)

);
create table ChiTietBanPhuTung(
MaChiTietBanPhuTung int primary key identity,
MaBanXe int,
MaPhuTung int,
SoLuong int,
GiaBan DECIMAL(10, 2),
    FOREIGN KEY (MaBanXe) REFERENCES HoaDonBanXe(MaBanXe),
    FOREIGN KEY (MaPhuTung) REFERENCES PhuTung(MaPhuTung)

);

CREATE TABLE HoaDonNhapXe (
    MaNhapXe INT PRIMARY KEY IDENTITY,
    MaNhaCungCap INT,
    MaNhanVien INT,
    NgayNhap DATE,
    GiaNhap DECIMAL(10, 2),
    FOREIGN KEY (MaNhaCungCap) REFERENCES NhaCungCap(MaNhaCungCap),
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien)
);

create table ChiTietNhapXe(
MaChiTietNhapXe int primary key identity,
MaNhapXe int,
MaModel INT,
MaThongSo int,
MauSac nvarchar(50),
SoLuong INT,
GiaBan DECIMAL(10, 2),
    FOREIGN KEY (MaNhapXe) REFERENCES HoaDonNhapXe(MaNhapXe),
    FOREIGN KEY (MaModel) REFERENCES ModelXe(MaModel),
    FOREIGN KEY (MaThongSo) REFERENCES ThongSoKyThuatXe(MaThongSo)

);

create table ChiTietNhapPhuTung(
MaChiTietBanPhuTung int primary key identity,
MaNhapXe int,
MaPhuTung int,
SoLuong int,
GiaBan DECIMAL(10, 2),
    FOREIGN KEY (MaNhapXe) REFERENCES HoaDonNhapXe(MaNhapXe),
    FOREIGN KEY (MaPhuTung) REFERENCES PhuTung(MaPhuTung)

);

SELECT*FROM KhachHang
--------------------------------------------------------------------------
--INSERT DỮ LIỆU
-- Chèn dữ liệu vào bảng TaiKhoan
INSERT INTO TaiKhoan (TenTaiKhoan, Email, SDT, MatKhau, Quyen) 
VALUES 
('user1', 'user1@example.com', '123456789', 'password1', 1),
('user2', 'user2@example.com', '987654321', 'password2', 2),
('user3', 'user3@example.com', '456789123', 'password3', 1),
('user4', 'user4@example.com', '789123456', 'password4', 2),
('user5', 'user5@example.com', '321654987', 'password5', 1);

-- Chèn dữ liệu vào bảng LoaiXe
INSERT INTO LoaiXe (TenLoaiXe) 
VALUES 
(N'Xe hơi'),
(N'Xe máy'),
(N'Xe tải'),
(N'Xe đạp'),
(N'Xe điện');

-- Chèn dữ liệu vào bảng HangXe
INSERT INTO HangXe (TenHang) 
VALUES 
(N'Toyota'),
(N'Honda'),
(N'Ford'),
(N'Yamaha'),
(N'Suzuki');

-- Chèn dữ liệu vào bảng ModelXe
INSERT INTO ModelXe (TenModel, MaHang, MaLoaiXe, NamSanXuat, Gia, HinhAnhXe, MoTa) 
VALUES 
(N'Camry', 1, 1, 2023, 100000, 'camry.jpg', 'Đây là mô tả cho Toyota Camry'),
(N'Civic', 2, 1, 2022, 95000, 'civic.jpg', 'Đây là mô tả cho Honda Civic'),
(N'Fiesta', 3, 1, 2024, 80000, 'fiesta.jpg', 'Đây là mô tả cho Ford Fiesta'),
(N'Exciter', 4, 2, 2023, 50000, 'exciter.jpg', 'Đây là mô tả cho Yamaha Exciter'),
(N'GSX-R150', 5, 2, 2022, 60000, 'gsxr150.jpg', 'Đây là mô tả cho Suzuki GSX-R150');

-- Chèn dữ liệu vào bảng ThongSoKyThuatXe
INSERT INTO ThongSoKyThuatXe (MaModel, PhienBanXe, LoaiDongCo, LoaiHieuDong, MauSac, CongSuat, MoMenXoan, LoaiNhienLieu) 
VALUES 
(1, 'Phiên bản 1', 'Động cơ X', 'Hệ dẫn động Y', 'Đen', 200, 150, 'Xăng'),
(2, 'Phiên bản 1', 'Động cơ A', 'Hệ dẫn động B', 'Trắng', 180, 120, 'Xăng'),
(3, 'Phiên bản 1', 'Động cơ C', 'Hệ dẫn động D', 'Xanh', 160, 100, 'Dầu'),
(4, 'Phiên bản 1', 'Động cơ P', 'Hệ dẫn động Q', 'Đỏ', 100, 80, 'Xăng'),
(5, 'Phiên bản 1', 'Động cơ M', 'Hệ dẫn động N', 'Vàng', 120, 90, 'Xăng');
-- Chèn dữ liệu vào bảng NhanVien
INSERT INTO NhanVien (MaTaiKhoan, TenNhanVien, ChucVu, DiaChi, SoDienThoai, Luong) 
VALUES 
(1, N'Nguyễn Văn A', N'Nhân viên bán hàng', N'Hà Nội', '0987654321', 1000),
(2, N'Trần Thị B', N'Kế toán', N'Hồ Chí Minh', '0123456789', 1200),
(3, N'Lê Văn C', N'Kỹ thuật viên', N'Đà Nẵng', '0369876543', 1100),
(4, N'Phạm Thị D', N'Nhân viên bán hàng', N'Hải Phòng', '0234567891', 1050),
(5, N'Huỳnh Văn E', N'Quản lý', N'Cần Thơ', '0345678912', 1500);

-- Chèn dữ liệu vào bảng KhachHang
INSERT INTO KhachHang (MaTaiKhoan, TenNguoiDung, Email, CMND, SDT) 
VALUES 
(6, N'Trần Văn F', 'tranvanf@example.com', '1234567890', '0987654321'),
(7, N'Nguyễn Thị G', 'nguyenthig@example.com', '0987654321', '0123456789'),
(8, N'Lê Văn H', 'levanh@example.com', '0987654321', '0369876543'),
(9, N'Huỳnh Thị I', 'huynhthii@example.com', '0987654321', '0234567891'),
(10, N'Phạm Văn K', 'phamvank@example.com', '0987654321', '0345678912');

-- Chèn dữ liệu vào bảng NhaCungCap
INSERT INTO NhaCungCap (TenNhaCungCap, DiaChi, SoDienThoai) 
VALUES 
(N'NhaCungCap A', N'Hà Nội', '0987654321'),
(N'NhaCungCap B', N'Hồ Chí Minh', '0123456789'),
(N'NhaCungCap C', N'Đà Nẵng', '0369876543'),
(N'NhaCungCap D', N'Hải Phòng', '0234567891'),
(N'NhaCungCap E', N'Cần Thơ', '0345678912');

-- Chèn dữ liệu vào bảng PhuTung
INSERT INTO PhuTung (TenPhuTung, Gia, SoLuong) 
VALUES 
(N'Lốp xe', 50, 100),
(N'Bóng đèn', 5, 200),
(N'Mâm xe', 30, 150),
(N'Bình xăng', 20, 120),
(N'Ắc quy', 40, 80);

SELECT*FROM KhachHang
-- Chèn dữ liệu vào bảng HoaDonBanXe
INSERT INTO HoaDonBanXe (MaNhanVien, MaKhachHang, NgayBan, TongTien) 
VALUES 
(1, 6, '2024-03-30', 200000),
(2, 2, '2024-03-30', 150000),
(3, 3, '2024-03-30', 180000),
(4, 4, '2024-03-30', 220000),
(5, 5, '2024-03-30', 250000);

SELECT*FROM HoaDonBanXe 
-- Chèn dữ liệu vào bảng ChiTietBanXe
INSERT INTO ChiTietBanXe (MaBanXe, MaModel, MaThongSo, MauSac, SoLuong, GiaBan) 
VALUES 
(7, 1, 1, N'Đen', 2, 100000),
(8, 2, 2, N'Trắng', 1, 95000),
(9, 3, 3, N'Xanh', 3, 80000),
(10, 4, 4, N'Đỏ', 1, 50000),
(11, 5, 5, N'Vàng', 2, 60000);

-- Chèn dữ liệu vào bảng ChiTietBanPhuTung
INSERT INTO ChiTietBanPhuTung (MaBanXe, MaPhuTung, SoLuong, GiaBan) 
VALUES 
(7, 1, 2, 100),
(8, 2, 1, 10),
(9, 3, 3, 90),
(10, 4, 1, 15),
(11, 5, 2, 30);

-- Chèn dữ liệu vào bảng HoaDonNhapXe
INSERT INTO HoaDonNhapXe (MaNhaCungCap, MaNhanVien, NgayNhap, GiaNhap) 
VALUES 
(1, 1, '2024-03-30', 80000),
(2, 2, '2024-03-30', 70000),
(3, 3, '2024-03-30', 75000),
(4, 4, '2024-03-30', 90000),
(5, 5, '2024-03-30', 85000);

-- Chèn dữ liệu vào bảng ChiTietNhapXe
INSERT INTO ChiTietNhapXe (MaNhapXe, MaModel, MaThongSo, MauSac, SoLuong, GiaBan) 
VALUES 
(1, 1, 1, N'Đen', 2, 80000),
(2, 2, 2, N'Trắng', 1, 70000),
(3, 3, 3, N'Xanh', 3, 75000),
(4, 4, 4, N'Đỏ', 1, 90000),
(5, 5, 5, N'Vàng', 2, 85000);

-- Chèn dữ liệu vào bảng ChiTietNhapPhuTung
INSERT INTO ChiTietNhapPhuTung (MaNhapXe, MaPhuTung, SoLuong, GiaBan) 
VALUES 
(1, 1, 2, 80),
(2, 2, 1, 7),
(3, 3, 3, 70),
(4, 4, 1, 9),
(5, 5, 2, 20);
