create database DA3_BanXeOTO;
use DA3_BanXeOTO;

CREATE TABLE users (
    id BIGINT PRIMARY KEY IDENTITY,
    name NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    email_verified_at DATETIME NULL,
    password NVARCHAR(255) NOT NULL,
    role INT,
    remember_token NVARCHAR(100),
    created_at DATETIME NULL,
    updated_at DATETIME NULL
);

CREATE TABLE ctusers (
    MaCTusers INT PRIMARY KEY IDENTITY,
    TaiKhoanID BIGINT NULL,
    HoVaTen NVARCHAR(100),
    DiaChi NVARCHAR(255),
    SDT NVARCHAR(20),
    AnhDaiDien TEXT,
    CMND NVARCHAR(12),
    UNIQUE(TaiKhoanID),
    FOREIGN KEY (TaiKhoanID) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
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
    TenModel NVARCHAR(100),
    MaHang INT,
    MaLoaiXe INT,
    NamSanXuat INT,
    Gia DECIMAL(10,0),
    HinhAnhXe TEXT,
    DSHinhAnhXe TEXT,
    MoTa TEXT,
    L100 NVARCHAR(245),
    NhienLieu NVARCHAR(245),
    HopSo NVARCHAR(245),
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaHang) REFERENCES HangXe(MaHang) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MaLoaiXe) REFERENCES LoaiXe(MaLoaiXe) ON DELETE CASCADE ON UPDATE CASCADE
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
    SoLuong INT,
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaMauNgoaiThat) REFERENCES MauNgoaiThat(MaMauNgoaiThat)
);

CREATE TABLE ThongSoKyThuatXe (
    MaThongSo INT PRIMARY KEY IDENTITY,
    MaModel INT,
    PhienBanXe NVARCHAR(255),
    LoaiDongCo NVARCHAR(255),
    LoaiHieuDong NVARCHAR(255),
    MauSac TEXT,
    CongSuat INT,
    MoMenXoan INT,
    LoaiNhienLieu NVARCHAR(255),
    TenPhienBan TEXT,
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
    TaiKhoanID BIGINT NULL,
    FOREIGN KEY (TaiKhoanID) REFERENCES users(id)
);

CREATE TABLE KhachHang (
    MaKhachHang INT PRIMARY KEY IDENTITY,
    TaiKhoanID BIGINT NULL,
    HoVaTen NVARCHAR(100),
    Email NVARCHAR(255),
    CMND NVARCHAR(20),
    SDT NVARCHAR(20),
    DiaChi NVARCHAR(255),
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (TaiKhoanID) REFERENCES users(id)
);

CREATE TABLE NhaCungCap (
    MaNhaCungCap INT PRIMARY KEY IDENTITY,
    TenNhaCungCap NVARCHAR(100) NOT NULL,
    DiaChi NVARCHAR(255),
    Email NVARCHAR(255),
    SoDienThoai NVARCHAR(20),
    NgayTao DATETIME DEFAULT GETDATE()
);

CREATE TABLE DatHang (
    MaDatHang INT PRIMARY KEY IDENTITY,
    MaKhachHang INT,
    NgayTao DATETIME DEFAULT GETDATE(),
    HinhThucNhan NVARCHAR(255) NOT NULL,
    DiaChiNhanXe NVARCHAR(255) NOT NULL,
    TongTien DECIMAL(10, 2),
    MaNhanVien INT,
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien),
    FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang)
);

CREATE TABLE TrangThaiDatHang (
    MaTrangThai INT PRIMARY KEY IDENTITY,
    MaDatHang INT,
    TrangThai NVARCHAR(255),
    NgayTao DATETIME DEFAULT GETDATE(),
    CoTrangThai INT,
    FOREIGN KEY (MaDatHang) REFERENCES DatHang(MaDatHang)
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
TenChuDe NVARCHAR(255),
HinhAnhChuDe TEXT,
HinhAnhTo TEXT,
GhiChu NVARCHAR(255),
NgayTao DATETIME DEFAULT GETDATE()
);


CREATE TABLE BaiViet (
MaBaiViet INT PRIMARY KEY IDENTITY,
TaiKhoanID BIGINT,
MaChuDe INT,
TieuDe NVARCHAR(255),
NoiDung TEXT,
NgayTao DATETIME DEFAULT GETDATE(),
FOREIGN KEY (TaiKhoanID) REFERENCES users(id),
FOREIGN KEY (MaChuDe) REFERENCES ChuDeBaiViet(MaChuDe)
);

CREATE TABLE BinhLuan (
MaBinhLuan INT PRIMARY KEY IDENTITY,
MaBaiViet INT,
MaModel INT,
TaiKhoanID BIGINT,
NoiDung TEXT,
NgayTao DATETIME DEFAULT GETDATE(),
FOREIGN KEY (MaBaiViet) REFERENCES BaiViet(MaBaiViet),
FOREIGN KEY (MaModel) REFERENCES ModelXe(MaModel),
FOREIGN KEY (TaiKhoanID) REFERENCES users(id)
);

CREATE TABLE QuangCao (
MaQuangCao INT PRIMARY KEY IDENTITY,
HinhAnh TEXT,
DSHinhAnh TEXT,
Link TEXT,
TieuDe NVARCHAR(255),
NgayTao DATETIME DEFAULT GETDATE()
);

CREATE TABLE LaiThu (
MaLaiThu INT PRIMARY KEY IDENTITY,
MaKhachHang INT NOT NULL,
MaModelXe INT NOT NULL,
MaNhanVien INT NULL,
NgayHen DATETIME NULL,
DiaChiShowroom TEXT,
GhiChu TEXT,
NgayTao DATETIME DEFAULT GETDATE(),
FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang),
FOREIGN KEY (MaModelXe) REFERENCES ModelXe(MaModel),
FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien)
);