create database DA3_BanXeOTO
go
use DA3_BanXeOTO;
-- Bảng chứa thông tin về người dùng

CREATE TABLE TaiKhoan (
    MaTaiKhoan INT PRIMARY KEY IDENTITY,
    TenTaiKhoan VARCHAR(100),
    Email VARCHAR(255),
    SDT varchar(20),
	MatKhau varchar(100),
	Quyen int,
    AnhDaiDien nvarchar(250),
    NgayTao datetime default GETDATE()

);

-- Bảng chứa thông tin về loại xe
CREATE TABLE LoaiXe (
    MaLoaiXe INT PRIMARY KEY IDENTITY,
    HinhAnhLoaiXe text,
    TenLoaiXe NVARCHAR(100) NOT NULL,
    NgayTao datetime default GETDATE()

);

-- Bảng chứa thông tin về các hãng xe
CREATE TABLE HangXe (
    MaHang INT PRIMARY KEY IDENTITY ,
    HinhAnhHangXe text,
    TenHang NVARCHAR(100) NOT NULL,
    NgayTao datetime default GETDATE()
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
	DSHinhAnhXe nvarchar(max),
	MoTa nvarchar(max),
    NgayTao datetime default GETDATE(),

    FOREIGN KEY (MaHang) REFERENCES HangXe(MaHang),
    FOREIGN KEY (MaLoaiXe) REFERENCES LoaiXe(MaLoaiXe)
);
create table PhienBanXe(
    MaPhienBan int primary key IDENTITY,
    MaModel int,
    TenPhienBan nvarchar(100),
    NgayTao datetime default GETDATE(),

    FOREIGN KEY (MaModel) REFERENCES ModelXe(MaModel)
)



create table MauNgoaiThat(
    MaMauNgoaiThat int primary key identity,
    MaPhienBan int,
    TenMauNgoaiThat nvarchar(100),
    HinhAnhMau text,
    NgayTao datetime default GETDATE(),

    FOREIGN KEY (MaPhienBan) REFERENCES PhienBanXe(MaPhienBan)
)

create table MauNoiThat(
    MaMauNoiThat int primary key identity,
    MaMauNgoaiThat int,
	TenMauNoiThat nvarchar(100),
    HinhAnhMau text,
    NgayTao datetime default GETDATE(),
    FOREIGN KEY (MaMauNgoaiThat) REFERENCES MauNgoaiThat(MaMauNgoaiThat)

)


-- Bảng chứa thông tin về các chi tiết kỹ thuật của xe
CREATE TABLE ThongSoKyThuatXe (
    MaThongSo INT PRIMARY KEY IDENTITY,
    MaModel INT,
	PhienBanXe nvarchar(255),
    LoaiDongCo NVARCHAR(255),
    LoaiHieuDong NVARCHAR(255),
	MauSac nvarchar(max),
    CongSuat INT,
    MoMenXoan INT,
    LoaiNhienLieu NVARCHAR(255),
    NgayTao datetime default GETDATE(),

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
    NgayTao datetime default GETDATE(),

    FOREIGN KEY (MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan)

);
-- Bảng chứa thông tin về người dùng
CREATE TABLE KhachHang (
    MaKhachHang INT PRIMARY KEY IDENTITY,
	MaTaiKhoan int,
    HoVaTen NVARCHAR(100),
    Email VARCHAR(255),
    CMND VARCHAR(20),
    SDT varchar(20),
    FOREIGN KEY (MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan),
    NgayTao datetime default GETDATE()
);


CREATE TABLE NhaCungCap (
    MaNhaCungCap INT PRIMARY KEY IDENTITY,
    TenNhaCungCap NVARCHAR(100) NOT NULL,
    DiaChi NVARCHAR(255),
    Email VARCHAR(255),
    SoDienThoai NVARCHAR(20),
    NgayTao datetime default GETDATE()
);

-- Bảng chứa thông tin liên quan đến việc bán xe
CREATE TABLE DatHang (
    MaDatHang INT PRIMARY KEY IDENTITY,
	MaKhachHang int,
    NgayTao Datetime default GETDATE(),
    TrangThai nvarchar(100),
	TongTien  DECIMAL(10, 2),
    FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang),
);

create table ChiTietDatHang(
MaChiTietDatHang int primary key identity,
MaDatHang int,
MaModel INT,
MaPhienBan int,
MaMauNgoaiThat int,
MaMauNoiThat int,
SoLuong INT,
GiaBan DECIMAL(10, 2),
FOREIGN KEY (MaPhienBan) REFERENCES PhienBanXe(MaPhienBan),
FOREIGN KEY (MaMauNgoaiThat) REFERENCES MauNgoaiThat(MaMauNgoaiThat),
FOREIGN KEY (MaMauNoiThat) REFERENCES MauNoiThat(MaMauNoiThat),
FOREIGN KEY (MaDatHang) REFERENCES DatHang(MaDatHang),
FOREIGN KEY (MaModel) REFERENCES ModelXe(MaModel),
);

CREATE TABLE HoaDonNhapXe (
    MaHoaDonNhap INT PRIMARY KEY IDENTITY,
    MaNhaCungCap INT,
    MaNhanVien INT,
    NgayTao Datetime default GETDATE(),
    GiaNhap DECIMAL(10, 2),
    FOREIGN KEY (MaNhaCungCap) REFERENCES NhaCungCap(MaNhaCungCap),
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien)
);

create table ChiTietNhapXe(
MaChiTietNhapXe int primary key identity,
MaHoaDonNhap int,
MaModel INT,
MaPhienBan int,
MaMauNgoaiThat int,
MaMauNoiThat int,
SoLuong INT,
GiaNhap DECIMAL(10, 2),
FOREIGN KEY (MaPhienBan) REFERENCES PhienBanXe(MaPhienBan),
FOREIGN KEY (MaMauNgoaiThat) REFERENCES MauNgoaiThat(MaMauNgoaiThat),
FOREIGN KEY (MaMauNoiThat) REFERENCES MauNoiThat(MaMauNoiThat),
FOREIGN KEY (MaHoaDonNhap) REFERENCES HoaDonNhapXe(MaHoaDonNhap),
FOREIGN KEY (MaModel) REFERENCES ModelXe(MaModel)
);

create table ChuDeBaiViet(
    MaChuDe int primary key identity,
    TenChuDu nvarchar(255),
    HinhAnhChuDe text,
    GhiChu nvarchar(255),
    NgayTao datetime default GETDATE(),
)

create table BaiViet( 
    MaBaiViet int primary key identity,
    MaTaiKhoan int,
    MaChuDe int,
    TieuDe nvarchar(255),
    NoiDung nvarchar(max),
    NgayTao datetime default GETDATE(),
FOREIGN KEY (MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan),
FOREIGN KEY (MaChuDe) REFERENCES ChuDeBaiViet(MaChuDe)
)

create table BinhLuan(
    MaBinhLuan int primary key identity,
    MaBaiViet int,
    MaModel int,
    MaTaiKhoan int,
    NoiDung nvarchar(max),
    NgayTao datetime default GETDATE(),
    FOREIGN KEY (MaBaiViet) REFERENCES BaiViet(MaBaiViet),
    FOREIGN KEY (MaModel) REFERENCES ModelXe(MaModel),
    FOREIGN KEY (MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan),
)



----------------------Thêm dữ liệu vào
INSERT INTO TaiKhoan (TenTaiKhoan, Email, SDT, MatKhau, Quyen, AnhDaiDien)
VALUES 
('admin', 'admin@example.com', '123456789', 'admin', 0, 'avatar1.jpg'),
('user', 'user@example.com', '987654321', 'user', 1, 'avatar2.jpg'),
('khachhang', 'user3@example.com', '111222333', 'khachhang', 2, 'avatar3.jpg'),
('user4', 'user4@example.com', '444555666', 'password4', 2, 'avatar4.jpg'),
('user5', 'user5@example.com', '777888999', 'password5', 1, 'avatar5.jpg'),
('user6', 'user6@example.com', '666555444', 'password6', 2, 'avatar6.jpg'),
('user7', 'user7@example.com', '333222111', 'password7', 1, 'avatar7.jpg'),
('user8', 'user8@example.com', '999888777', 'password8', 2, 'avatar8.jpg'),
('user9', 'user9@example.com', '000111222', 'password9', 1, 'avatar9.jpg'),
('user10', 'user10@example.com', '333444555', 'password10', 2, 'avatar10.jpg');


INSERT INTO LoaiXe (HinhAnhLoaiXe, TenLoaiXe)
VALUES 
('loaixe1.jpg', 'Sedan'),
('loaixe2.jpg', 'SUV'),
('loaixe3.jpg', 'Hatchback'),
('loaixe4.jpg', 'Crossover'),
('loaixe5.jpg', 'Coupe'),
('loaixe6.jpg', 'Convertible'),
('loaixe7.jpg', 'Minivan'),
('loaixe8.jpg', 'Truck'),
('loaixe9.jpg', 'Van'),
('loaixe10.jpg', 'Electric');


INSERT INTO HangXe (HinhAnhHangXe, TenHang)
VALUES 
('hangxe1.jpg', 'Toyota'),
('hangxe2.jpg', 'Honda'),
('hangxe3.jpg', 'Ford'),
('hangxe4.jpg', 'BMW'),
('hangxe5.jpg', 'Mercedes-Benz'),
('hangxe6.jpg', 'Audi'),
('hangxe7.jpg', 'Nissan'),
('hangxe8.jpg', 'Chevrolet'),
('hangxe9.jpg', 'Hyundai'),
('hangxe10.jpg', 'Kia');


INSERT INTO ModelXe (TenModel, MaHang, MaLoaiXe, NamSanXuat, Gia, HinhAnhXe, DSHinhAnhXe, MoTa)
VALUES 
('Corolla', 1, 1, 2022, 25000.00, 'corolla.jpg', '["corolla-1.jpg", "corolla-2.jpg", "corolla-3.jpg"]', 'Best-selling sedan worldwide.'),
('Civic', 2, 1, 2023, 27000.00, 'civic.jpg', '["civic-1.jpg", "civic-2.jpg", "civic-3.jpg"]', 'Popular compact car from Honda.'),
('F-150', 3, 8, 2024, 35000.00, 'f150.jpg', '["f150-1.jpg", "f150-2.jpg", "f150-3.jpg"]', 'Best-selling pickup truck in the US.'),
('3 Series', 4, 2, 2023, 45000.00, '3series.jpg', '["3series-1.jpg", "3series-2.jpg", "3series-3.jpg"]', 'Luxury compact car from BMW.'),
('E-Class', 5, 1, 2022, 55000.00, 'eclass.jpg', '["eclass-1.jpg", "eclass-2.jpg", "eclass-3.jpg"]', 'Luxury executive car from Mercedes-Benz.'),
('A4', 6, 1, 2023, 50000.00, 'a4.jpg', '["a4-1.jpg", "a4-2.jpg", "a4-3.jpg"]', 'Compact executive car from Audi.'),
('Altima', 7, 1, 2024, 30000.00, 'altima.jpg', '["altima-1.jpg", "altima-2.jpg", "altima-3.jpg"]', 'Popular mid-size sedan from Nissan.'),
('Silverado', 8, 8, 2022, 40000.00, 'silverado.jpg', '["silverado-1.jpg", "silverado-2.jpg", "silverado-3.jpg"]', 'Full-size pickup truck from Chevrolet.'),
('Santa Fe', 9, 2, 2023, 38000.00, 'santafe.jpg', '["santafe-1.jpg", "santafe-2.jpg", "santafe-3.jpg"]', 'Mid-size SUV from Hyundai.'),
('Sportage', 10, 1, 2024, 32000.00, 'sportage.jpg', '["sportage-1.jpg", "sportage-2.jpg", "sportage-3.jpg"]', 'Compact SUV from Kia.');


INSERT INTO PhienBanXe (MaModel, TenPhienBan)
VALUES 
(1, 'Standard'),
(2, 'Touring'),
(3, 'Limited'),
(4, 'Luxury'),
(5, 'Performance'),
(6, 'Premium'),
(7, 'Platinum'),
(8, 'Special Edition'),
(9, 'Elite'),
(10, 'Ultimate');


INSERT INTO MauNgoaiThat (MaPhienBan, TenMauNgoaiThat, HinhAnhMau)
VALUES 
(1, 'Black', 'black.jpg'),
(2, 'White', 'white.jpg'),
(3, 'Silver', 'silver.jpg'),
(4, 'Red', 'red.jpg'),
(5, 'Blue', 'blue.jpg'),
(6, 'Green', 'green.jpg'),
(7, 'Gray', 'gray.jpg'),
(8, 'Yellow', 'yellow.jpg'),
(9, 'Orange', 'orange.jpg'),
(10, 'Brown', 'brown.jpg');

INSERT INTO MauNoiThat (MaMauNgoaiThat, TenMauNoiThat, HinhAnhMau)
VALUES 
(1, 'Black', 'black_interior.jpg'),
(2, 'White', 'white_interior.jpg'),
(3, 'Beige', 'beige_interior.jpg'),
(4, 'Gray', 'gray_interior.jpg'),
(5, 'Brown', 'brown_interior.jpg'),
(6, 'Red', 'red_interior.jpg'),
(7, 'Blue', 'blue_interior.jpg'),
(8, 'Green', 'green_interior.jpg'),
(9, 'Orange', 'orange_interior.jpg'),
(10, 'Silver', 'silver_interior.jpg');


INSERT INTO ThongSoKyThuatXe (MaModel, PhienBanXe, LoaiDongCo, LoaiHieuDong, MauSac, CongSuat, MoMenXoan, LoaiNhienLieu)
VALUES 
(1, 'Standard', 'Inline-4', 'Front-Wheel Drive', 'Black', 180, 200, 'Gasoline'),
(2, 'Touring', 'Inline-4', 'Front-Wheel Drive', 'White', 170, 190, 'Gasoline'),
(3, 'Limited', 'V6', 'All-Wheel Drive', 'Silver', 250, 280, 'Gasoline'),
(4, 'Luxury', 'Inline-6', 'Rear-Wheel Drive', 'Red', 320, 350, 'Gasoline'),
(5, 'Performance', 'V8', 'All-Wheel Drive', 'Blue', 400, 450, 'Gasoline'),
(6, 'Premium', 'V6', 'Front-Wheel Drive', 'Green', 260, 300, 'Gasoline'),
(7, 'Platinum', 'V8', 'Rear-Wheel Drive', 'Gray', 360, 400, 'Gasoline'),
(8, 'Special Edition', 'V6', 'All-Wheel Drive', 'Yellow', 280, 320, 'Gasoline'),
(9, 'Elite', 'V6', 'Front-Wheel Drive', 'Orange', 270, 310, 'Gasoline'),
(10, 'Ultimate', 'Inline-4', 'Front-Wheel Drive', 'Brown', 190, 210, 'Gasoline');

INSERT INTO NhanVien (MaTaiKhoan, TenNhanVien, ChucVu, DiaChi, SoDienThoai, Luong)
VALUES 
(1, 'John Doe', 'Sales Manager', '123 Main St, City', '123456789', 3000.00),
(2, 'Jane Smith', 'Marketing Coordinator', '456 Elm St, Town', '987654321', 2500.00),
(3, 'David Brown', 'Finance Analyst', '789 Oak St, Village', '111222333', 2800.00),
(4, 'Emily Johnson', 'HR Specialist', '101 Pine St, Hamlet', '444555666', 2700.00),
(5, 'Michael Davis', 'IT Administrator', '202 Maple St, County', '777888999', 3200.00),
(6, 'Sarah Wilson', 'Customer Service Representative', '303 Birch St, Borough', '666555444', 2400.00),
(7, 'Matthew Taylor', 'Operations Manager', '404 Walnut St, Township', '333222111', 3500.00),
(8, 'Jessica Martinez', 'Logistics Coordinator', '505 Cedar St, District', '999888777', 2600.00),
(9, 'Daniel Thomas', 'Quality Assurance Specialist', '606 Oak St, Province', '000111222', 2900.00),
(10, 'Linda Rodriguez', 'Inventory Control Manager', '707 Pine St, Territory', '333444555', 3300.00);


INSERT INTO KhachHang (MaTaiKhoan, HoVaTen, Email, CMND, SDT)
VALUES 
(1, 'Nguyen Van A', 'vana@example.com', '123456789', '111222333'),
(2, 'Tran Thi B', 'thib@example.com', '987654321', '444555666'),
(3, 'Le Van C', 'vanc@example.com', '111222333', '777888999'),
(4, 'Pham Thi D', 'thid@example.com', '444555666', '666555444'),
(5, 'Hoang Van E', 'vane@example.com', '777888999', '333222111'),
(6, 'Nguyen Thi F', 'thif@example.com', '666555444', '999888777'),
(7, 'Tran Van G', 'vang@example.com', '333222111', '000111222'),
(8, 'Le Thi H', 'thih@example.com', '999888777', '333444555'),
(9, 'Pham Van I', 'vani@example.com', '000111222', '111222333'),
(10, 'Hoang Thi K', 'thik@example.com', '333444555', '777888999');

INSERT INTO NhaCungCap (TenNhaCungCap, DiaChi, Email, SoDienThoai)
VALUES 
('ABC Auto Parts', '123 Supplier St, City', 'abcparts@example.com', '111222333'),
('XYZ Motors', '456 Distributor St, Town', 'xyzmotors@example.com', '444555666'),
('123 Auto Supplies', '789 Warehouse St, Village', '123supplies@example.com', '777888999'),
('456 Car Accessories', '101 Retailer St, Hamlet', '456accessories@example.com', '666555444'),
('789 Auto Group', '202 Wholesaler St, County', '789group@example.com', '333222111'),
('ABC Motors', '303 Dealer St, Borough', 'abcmotors@example.com', '999888777'),
('XYZ Auto', '404 Distributor St, Township', 'xyzauto@example.com', '000111222'),
('123 Auto Parts', '505 Supplier St, District', '123autoparts@example.com', '333444555'),
('456 Motors', '606 Retailer St, Province', '456motors@example.com', '777888999'),
('789 Auto Mall', '707 Dealer St, Territory', '789mall@example.com', '111222333');

INSERT INTO DatHang (MaKhachHang, NgayTao, TrangThai, TongTien)
VALUES 
(11, GETDATE(), 'Đã nhận đơn hàng nhân viên sẽ liên hệ xác nhận', 1500.00),
(2, GETDATE(), 'Đang xử lý', 2000.00),
(3, GETDATE(), 'Đã giao hàng', 1800.00),
(4, GETDATE(), 'Đã thanh toán', 2200.00),
(5, GETDATE(), 'Chờ xe về', 1900.00),
(6, GETDATE(), 'Xe đã về showroom', 2100.00),
(7, GETDATE(), 'Đang giao xe', 1600.00),
(8, GETDATE(), 'Chờ khách hàng tới nhận xe', 2300.00),
(9, GETDATE(), 'Giao hàng và thanh toán thành công', 2400.00),
(10, GETDATE(), 'Đang xử lý', 1700.00);
INSERT INTO ChiTietDatHang (MaDatHang, MaModel, MaPhienBan, MaMauNgoaiThat, MaMauNoiThat, SoLuong, GiaBan)
VALUES 
(11, 1, 1, 1, 1, 1, 25000.00),
(2, 2, 2, 2, 2, 1, 27000.00),
(3, 3, 3, 3, 3, 1, 35000.00),
(4, 4, 4, 4, 4, 1, 45000.00),
(5, 5, 5, 5, 5, 1, 55000.00),
(6, 6, 6, 6, 6, 1, 50000.00),
(7, 7, 7, 7, 7, 1, 30000.00),
(8, 8, 8, 8, 8, 1, 40000.00),
(9, 9, 9, 9, 9, 1, 38000.00),
(10, 10, 10, 10, 10, 1, 32000.00);

INSERT INTO HoaDonNhapXe (MaNhaCungCap, MaNhanVien, NgayTao, GiaNhap)
VALUES 
(1, 1, GETDATE(), 20000.00),
(2, 2, GETDATE(), 18000.00),
(3, 3, GETDATE(), 22000.00),
(4, 4, GETDATE(), 25000.00),
(5, 5, GETDATE(), 23000.00),
(6, 6, GETDATE(), 19000.00),
(7, 7, GETDATE(), 21000.00),
(8, 8, GETDATE(), 24000.00),
(9, 9, GETDATE(), 27000.00),
(10, 10, GETDATE(), 26000.00);

INSERT INTO ChiTietNhapXe (MaHoaDonNhap, MaModel, MaPhienBan, MaMauNgoaiThat, MaMauNoiThat, SoLuong, GiaNhap)
VALUES 
(1, 1, 1, 1, 1, 5, 20000.00),
(2, 2, 2, 2, 2, 4, 18000.00),
(3, 3, 3, 3, 3, 3, 22000.00),
(4, 4, 4, 4, 4, 6, 25000.00),
(5, 5, 5, 5, 5, 7, 23000.00),
(6, 6, 6, 6, 6, 8, 19000.00),
(7, 7, 7, 7, 7, 4, 21000.00),
(8, 8, 8, 8, 8, 3, 24000.00),
(9, 9, 9, 9, 9, 5, 27000.00),
(10, 10, 10, 10, 10, 6, 26000.00);

INSERT INTO ChuDeBaiViet (TenChuDu, HinhAnhChuDe, GhiChu, NgayTao)
VALUES 
('Công nghệ', 'congnghe.jpg', 'Công nghệ mới nhất', GETDATE()),
('Xe hơi', 'xehoi.jpg', 'Cập nhật tin tức về xe hơi', GETDATE()),
('Ẩm thực', 'amthuc.jpg', 'Các món ăn ngon mỗi ngày', GETDATE()),
('Du lịch', 'dulich.jpg', 'Kinh nghiệm du lịch hữu ích', GETDATE()),
('Sức khỏe', 'suckhoe.jpg', 'Bí quyết giữ gìn sức khỏe', GETDATE()),
('Thể thao', 'thethao.jpg', 'Thông tin về các môn thể thao', GETDATE()),
('Gia đình', 'giadinh.jpg', 'Chia sẻ kinh nghiệm về gia đình', GETDATE()),
('Mẹo vặt', 'meovat.jpg', 'Những mẹo vặt trong cuộc sống', GETDATE()),
('Phong cách sống', 'phongcachsong.jpg', 'Chia sẻ phong cách sống', GETDATE()),
('Âm nhạc', 'amnhac.jpg', 'Những bản nhạc hot nhất hiện nay', GETDATE());

INSERT INTO BaiViet (MaTaiKhoan, MaChuDe, TieuDe, NoiDung, NgayTao)
VALUES 
(1, 1, 'Những xu hướng công nghệ nổi bật năm 2024', 'Trong năm 2024, có nhiều xu hướng công nghệ đột phá, từ trí tuệ nhân tạo đến ô tô tự lái và thực tế ảo.', GETDATE()),
(2, 2, 'Ra mắt mẫu sedan mới của Honda', 'Honda vừa công bố mẫu sedan mới với thiết kế hiện đại và tính năng an toàn tiên tiến.', GETDATE()),
(3, 3, 'Top 10 món ăn ngon không thể bỏ qua', 'Danh sách những món ăn ngon đặc sản từ khắp nơi trên thế giới, từ mì phở Việt Nam đến pizza Ý.', GETDATE()),
(4, 4, 'Khám phá điểm du lịch mới ở Hawaii', 'Hawaii không chỉ có bãi biển đẹp mê hồn mà còn có nhiều điểm du lịch độc đáo như hồ núi lửa và thác nước tuyệt đẹp.', GETDATE()),
(5, 5, 'Bí quyết giữ gìn sức khỏe mỗi ngày', 'Các chuyên gia sức khỏe chia sẻ những bí quyết đơn giản giúp duy trì sức khỏe tốt mỗi ngày.', GETDATE()),
(6, 6, 'Cập nhật kết quả các trận đấu thể thao mới nhất', 'Thông tin mới nhất về kết quả các trận đấu từ bóng đá đến quần vợt và bóng rổ.', GETDATE()),
(7, 7, 'Những phương pháp giải quyết xung đột trong gia đình', 'Học cách giải quyết xung đột và tạo ra môi trường hòa hợp và hạnh phúc trong gia đình.', GETDATE()),
(8, 8, '10 mẹo vặt giúp tiết kiệm thời gian hàng ngày', 'Những mẹo vặt đơn giản nhưng hữu ích giúp bạn tiết kiệm thời gian và công sức hàng ngày.', GETDATE()),
(9, 9, 'Phong cách sống lành mạnh và hạnh phúc', 'Tìm hiểu về phong cách sống lành mạnh và các bước đơn giản để tạo ra một cuộc sống hạnh phúc.', GETDATE()),
(10, 10, 'Top 10 bản nhạc hot nhất tháng này', 'Danh sách những bản nhạc được yêu thích và hot nhất trong tháng này, từ pop đến hip hop.', GETDATE());

INSERT INTO BinhLuan (MaBaiViet, MaModel, MaTaiKhoan, NoiDung, NgayTao)
VALUES 
(1, null, 1, N'Bài viết rất thú vị và cập nhật.', GETDATE()),
(null, 2, 2, N'Mẫu sedan mới của Honda trông rất hấp dẫn!', GETDATE()),
(3, null, 3, N'Món phở Việt Nam là ngon nhất!', GETDATE()),
(4, null, 4, N'Hawaii là nơi mơ ước của tôi.', GETDATE()),
(null, 5, 5, N'Bí quyết giữ gìn sức khỏe rất hữu ích.', GETDATE()),
(6, null, 6, N'Cập nhật kết quả thể thao nhanh chóng và chính xác.', GETDATE()),
(null, 7, 7, N'Học cách giải quyết xung đột là một kỹ năng quan trọng.', GETDATE()),
(8, null, 8, N'Những mẹo vặt này thật sự giúp tiết kiệm thời gian.', GETDATE()),
(null, 9, 9, N'Cuộc sống lành mạnh là chìa khóa cho hạnh phúc.', GETDATE()),
(10, null, 10, N'Âm nhạc là nguồn cảm hứng cho tôi.', GETDATE());

drop table 