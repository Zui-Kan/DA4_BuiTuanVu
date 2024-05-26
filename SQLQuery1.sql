CREATE DATABASE DA3_BanXeOTO;

USE DA3_BanXeOTO;
go
CREATE TABLE users (
    id BIGINT PRIMARY KEY IDENTITY,
    name NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    email_verified_at DATETIME,
    [password] NVARCHAR(255) NOT NULL,
    [role] INT,
    remember_token NVARCHAR(100),
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE CTusers (
    MaCTusers INT PRIMARY KEY IDENTITY,
	TaiKhoanID BIGINT UNIQUE,
    HoVaTen NVARCHAR(100),
    DiaChi NVARCHAR(255),
    SDT NVARCHAR(20),
	AnhDaiDien TEXT,
    CMND NVARCHAR(12),
	FOREIGN KEY (TaiKhoanID) REFERENCES users(id)
);

CREATE TABLE LoaiXe (
    MaLoaiXe INT PRIMARY KEY IDENTITY,
    HinhAnhLoaiXe TEXT,
    TenLoaiXe NVARCHAR(100) NOT NULL,
    NgayTao DATETIME DEFAULT GETDATE()
);

CREATE TABLE HangXe (
    MaHang INT PRIMARY KEY IDENTITY,
    HinhAnhHangXe TEXT,
    TenHang NVARCHAR(100) NOT NULL,
    NgayTao DATETIME DEFAULT GETDATE()
);

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
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaHang) REFERENCES HangXe(MaHang),
    FOREIGN KEY (MaLoaiXe) REFERENCES LoaiXe(MaLoaiXe)
);

CREATE TABLE PhienBanXe (
    MaPhienBan INT PRIMARY KEY IDENTITY,
    MaModel INT,
    TenPhienBan NVARCHAR(100),
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaModel) REFERENCES ModelXe(MaModel)
);

CREATE TABLE MauNgoaiThat (
    MaMauNgoaiThat INT PRIMARY KEY IDENTITY,
    MaPhienBan INT,
    TenMauNgoaiThat NVARCHAR(100),
    HinhAnhMau TEXT,
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaPhienBan) REFERENCES PhienBanXe(MaPhienBan)
);

CREATE TABLE MauNoiThat (
    MaMauNoiThat INT PRIMARY KEY IDENTITY,
    MaMauNgoaiThat INT,
	TenMauNoiThat NVARCHAR(100),
    HinhAnhMau TEXT,
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaMauNgoaiThat) REFERENCES MauNgoaiThat(MaMauNgoaiThat)
);

CREATE TABLE ThongSoKyThuatXe (
    MaThongSo INT PRIMARY KEY IDENTITY,
    MaModel INT,
	PhienBanXe NVARCHAR(255),
    LoaiDongCo NVARCHAR(255),
    LoaiHieuDong NVARCHAR(255),
	MauSac nvarchar(max),
    CongSuat INT,
    MoMenXoan INT,
    LoaiNhienLieu NVARCHAR(255),
    TenPhienBan nvarchar(max),
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaModel) REFERENCES ModelXe(MaModel)
);

CREATE TABLE NhanVien (
    MaNhanVien INT PRIMARY KEY IDENTITY,
    TenNhanVien NVARCHAR(100) NOT NULL,
    ChucVu NVARCHAR(100),
    DiaChi NVARCHAR(255),
    SoDienThoai NVARCHAR(20),
    Luong DECIMAL(10, 2),
    NgayTao DATETIME DEFAULT GETDATE(),
    TaiKhoanID BIGINT,
    FOREIGN KEY (TaiKhoanID) REFERENCES users(id)
);

CREATE TABLE KhachHang (
    MaKhachHang INT PRIMARY KEY IDENTITY,
	TaiKhoanID BIGINT,
    HoVaTen NVARCHAR(100),
    Email VARCHAR(255),
    CMND VARCHAR(20),
    SDT NVARCHAR(20),
    DiaChi NVARCHAR(255),
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (TaiKhoanID) REFERENCES users(id)
);

CREATE TABLE NhaCungCap (
    MaNhaCungCap INT PRIMARY KEY IDENTITY,
    TenNhaCungCap NVARCHAR(100) NOT NULL,
    DiaChi NVARCHAR(255),
    Email VARCHAR(255),
    SoDienThoai NVARCHAR(20),
    NgayTao DATETIME DEFAULT GETDATE()
);

CREATE TABLE DatHang (
    MaDatHang INT PRIMARY KEY IDENTITY,
	MaKhachHang INT,
    NgayTao DATETIME DEFAULT GETDATE(),
    TrangThai NVARCHAR(100),      
    HinhThucNhan NVARCHAR(255) NOT NULL,
    DiaChiNhanXe NVARCHAR(255) NOT NULL,
	TongTien  DECIMAL(10, 2),
    MaNhanVien INT,
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien),
    FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang)
);

CREATE TABLE ChiTietDatHang (
    MaChiTietDatHang INT PRIMARY KEY IDENTITY,
    MaDatHang INT,
    MaModel INT,
    MaPhienBan INT,
    MaMauNgoaiThat INT,
    MaMauNoiThat INT,
    SoLuong INT,
    GiaBan DECIMAL(10, 2),
    FOREIGN KEY (MaPhienBan) REFERENCES PhienBanXe(MaPhienBan),
    FOREIGN KEY (MaMauNgoaiThat) REFERENCES MauNgoaiThat(MaMauNgoaiThat),
    FOREIGN KEY (MaMauNoiThat) REFERENCES MauNoiThat(MaMauNoiThat),
    FOREIGN KEY (MaDatHang) REFERENCES DatHang(MaDatHang),
    FOREIGN KEY (MaModel) REFERENCES ModelXe(MaModel)
);

CREATE TABLE HoaDonNhapXe (
    MaHoaDonNhap INT PRIMARY KEY IDENTITY,
    MaNhaCungCap INT,
    MaNhanVien INT,
    NgayTao DATETIME DEFAULT GETDATE(),
    GiaNhap DECIMAL(10, 2),
    FOREIGN KEY (MaNhaCungCap) REFERENCES NhaCungCap(MaNhaCungCap),
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien)
);

CREATE TABLE ChiTietNhapXe (
    MaChiTietNhapXe INT PRIMARY KEY IDENTITY,
    MaHoaDonNhap INT,
    MaModel INT,
    MaPhienBan INT,
MaMauNgoaiThat INT,
MaMauNoiThat INT,
SoLuong INT,
GiaNhap DECIMAL(10, 2),
FOREIGN KEY (MaPhienBan) REFERENCES PhienBanXe(MaPhienBan),
FOREIGN KEY (MaMauNgoaiThat) REFERENCES MauNgoaiThat(MaMauNgoaiThat),
FOREIGN KEY (MaMauNoiThat) REFERENCES MauNoiThat(MaMauNoiThat),
FOREIGN KEY (MaHoaDonNhap) REFERENCES HoaDonNhapXe(MaHoaDonNhap),
FOREIGN KEY (MaModel) REFERENCES ModelXe(MaModel)
);

CREATE TABLE ChuDeBaiViet (
MaChuDe INT PRIMARY KEY IDENTITY,
TenChuDu NVARCHAR(255),
HinhAnhChuDe TEXT,
GhiChu NVARCHAR(255),
NgayTao DATETIME DEFAULT GETDATE()
);


CREATE TABLE BaiViet (
MaBaiViet INT PRIMARY KEY IDENTITY,
	TaiKhoanID BIGINT ,
MaChuDe INT,
TieuDe NVARCHAR(255),
NoiDung nvarchar(max),
NgayTao DATETIME DEFAULT GETDATE(),
FOREIGN KEY (TaiKhoanID) REFERENCES users(id),
FOREIGN KEY (MaChuDe) REFERENCES ChuDeBaiViet(MaChuDe)
);

CREATE TABLE BinhLuan (
MaBinhLuan INT PRIMARY KEY IDENTITY,
MaBaiViet INT,
MaModel INT,
	TaiKhoanID BIGINT ,
NoiDung nvarchar(max),
NgayTao DATETIME DEFAULT GETDATE(),
FOREIGN KEY (MaBaiViet) REFERENCES BaiViet(MaBaiViet),
FOREIGN KEY (MaModel) REFERENCES ModelXe(MaModel),
FOREIGN KEY (TaiKhoanID) REFERENCES users(id)
);

CREATE TABLE YeuCauHuy (
MaYeuCauHuy INT PRIMARY KEY IDENTITY,
MaDatHang INT,
TrangThai NVARCHAR(100) DEFAULT 'Đang chờ xác nhận từ admin',
NgayYeuCau DATETIME DEFAULT GETDATE(),
FOREIGN KEY (MaDatHang) REFERENCES DatHang(MaDatHang)
);

CREATE TABLE QuangCao (
MaQuangCao INT PRIMARY KEY IDENTITY,
HinhAnh TEXT,
DSHinhAnh TEXT,
Link TEXT,
TieuDe NVARCHAR(255),
NgayTao DATETIME DEFAULT GETDATE()
);

CREATE TABLE Laithu (
MaLaiThu INT NOT NULL IDENTITY,
MaKhachHang INT NOT NULL,
MaModelXe INT NOT NULL,
MaNhanVien INT,
NgayHen DATETIME,
DiaChiShowroom TEXT,
GhiChu TEXT,
NgayTao DATETIME DEFAULT GETDATE(),
PRIMARY KEY (MaLaiThu),
FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang),
FOREIGN KEY (MaModelXe) REFERENCES ModelXe(MaModel),
FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien)
);