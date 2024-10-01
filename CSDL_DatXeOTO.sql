-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: da3_banxeoto
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `baiviet`
--

DROP TABLE IF EXISTS `baiviet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baiviet` (
  `MaBaiViet` int NOT NULL AUTO_INCREMENT,
  `MaChuDe` int DEFAULT NULL,
  `TaiKhoanID` bigint unsigned DEFAULT NULL,
  `TieuDe` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `NoiDung` longtext COLLATE utf8mb4_unicode_ci,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaBaiViet`),
  KEY `baiviet_idfk_1_idx` (`TaiKhoanID`),
  KEY `baiviet_ibfk_2` (`MaChuDe`),
  CONSTRAINT `baiviet_ibfk_2` FOREIGN KEY (`MaChuDe`) REFERENCES `chudebaiviet` (`MaChuDe`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `baiviet_idfk_1` FOREIGN KEY (`TaiKhoanID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baiviet`
--

LOCK TABLES `baiviet` WRITE;
/*!40000 ALTER TABLE `baiviet` DISABLE KEYS */;
INSERT INTO `baiviet` VALUES (1,1,3,'Những xu hướng công nghệ nổi bật năm 2024','Trong năm 2024, có nhiều xu hướng công nghệ đột phá, từ trí tuệ nhân tạo đến ô tô tự lái và thực tế ảo.','2024-05-09 15:11:39'),(2,2,7,'Ra mắt mẫu sedan mới của Honda','Honda vừa công bố mẫu sedan mới với thiết kế hiện đại và tính năng an toàn tiên tiến.','2024-05-09 15:11:39'),(5,5,10,'Bí quyết giữ gìn sức khỏe mỗi ngày','Các chuyên gia sức khỏe chia sẻ những bí quyết đơn giản giúp duy trì sức khỏe tốt mỗi ngày.','2024-05-09 15:11:39'),(7,7,6,'Những phương pháp giải quyết xung đột trong gia đình','Học cách giải quyết xung đột và tạo ra môi trường hòa hợp và hạnh phúc trong gia đình.','2024-05-09 15:11:39'),(9,9,6,'Phong cách sống lành mạnh và hạnh phúc','Tìm hiểu về phong cách sống lành mạnh và các bước đơn giản để tạo ra một cuộc sống hạnh phúc.','2024-05-09 15:11:39');
/*!40000 ALTER TABLE `baiviet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `binhluan`
--

DROP TABLE IF EXISTS `binhluan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `binhluan` (
  `MaBinhLuan` int NOT NULL AUTO_INCREMENT,
  `MaBaiViet` int DEFAULT NULL,
  `MaModel` int DEFAULT NULL,
  `TaiKhoanID` bigint unsigned DEFAULT NULL,
  `NoiDung` longtext COLLATE utf8mb4_unicode_ci,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaBinhLuan`),
  KEY `binhluan_ibfk3_idx` (`TaiKhoanID`),
  KEY `binhluan_ibfk_1` (`MaBaiViet`),
  KEY `binhluan_ibfk_2` (`MaModel`),
  CONSTRAINT `binhluan_ibfk3` FOREIGN KEY (`TaiKhoanID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `binhluan_ibfk_1` FOREIGN KEY (`MaBaiViet`) REFERENCES `baiviet` (`MaBaiViet`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `binhluan_ibfk_2` FOREIGN KEY (`MaModel`) REFERENCES `modelxe` (`MaModel`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `binhluan`
--

LOCK TABLES `binhluan` WRITE;
/*!40000 ALTER TABLE `binhluan` DISABLE KEYS */;
INSERT INTO `binhluan` VALUES (2,NULL,2,3,'Mẫu sedan mới của Honda trông rất hấp dẫn!','2024-05-09 15:11:39'),(7,NULL,7,NULL,'Học cách giải quyết xung đột là một kỹ năng quan trọng.','2024-05-09 15:11:39'),(9,NULL,9,NULL,'Cuộc sống lành mạnh là chìa khóa cho hạnh phúc.','2024-05-09 15:11:39'),(11,NULL,5,3,'Hello mọi người nha','2024-05-28 21:21:43'),(19,NULL,2,10,'b','2024-05-29 08:11:17'),(21,NULL,1,10,'hi','2024-05-29 08:21:06'),(23,NULL,1,10,'h','2024-05-29 08:24:30'),(24,NULL,1,10,'cay','2024-05-29 08:25:41'),(25,NULL,1,10,'test','2024-05-29 08:26:00'),(26,NULL,1,10,'ac','2024-05-29 08:26:17'),(27,NULL,3,10,'hi','2024-05-31 08:40:36'),(33,NULL,1,10,'d','2024-06-01 21:15:13'),(38,NULL,56,10,'xin chào','2024-06-11 00:39:31'),(40,NULL,62,10,'khang','2024-06-17 20:20:20');
/*!40000 ALTER TABLE `binhluan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietdathang`
--

DROP TABLE IF EXISTS `chitietdathang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietdathang` (
  `MaChiTietDatHang` int NOT NULL AUTO_INCREMENT,
  `MaDatHang` int DEFAULT NULL,
  `MaModel` int DEFAULT NULL,
  `MaPhienBan` int DEFAULT NULL,
  `MaMauNgoaiThat` int DEFAULT NULL,
  `MaMauNoiThat` int DEFAULT NULL,
  `SoLuong` int DEFAULT NULL,
  `GiaBan` decimal(30,0) DEFAULT NULL,
  PRIMARY KEY (`MaChiTietDatHang`),
  KEY `chitietdathang_ibfk_1` (`MaPhienBan`),
  KEY `chitietdathang_ibfk_2` (`MaMauNgoaiThat`),
  KEY `chitietdathang_ibfk_3` (`MaMauNoiThat`),
  KEY `chitietdathang_ibfk_4` (`MaDatHang`),
  KEY `chitietdathang_ibfk_5` (`MaModel`),
  CONSTRAINT `chitietdathang_ibfk_1` FOREIGN KEY (`MaPhienBan`) REFERENCES `phienbanxe` (`MaPhienBan`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chitietdathang_ibfk_2` FOREIGN KEY (`MaMauNgoaiThat`) REFERENCES `maungoaithat` (`MaMauNgoaiThat`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chitietdathang_ibfk_3` FOREIGN KEY (`MaMauNoiThat`) REFERENCES `maunoithat` (`MaMauNoiThat`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chitietdathang_ibfk_4` FOREIGN KEY (`MaDatHang`) REFERENCES `dathang` (`MaDatHang`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chitietdathang_ibfk_5` FOREIGN KEY (`MaModel`) REFERENCES `modelxe` (`MaModel`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdathang`
--

LOCK TABLES `chitietdathang` WRITE;
/*!40000 ALTER TABLE `chitietdathang` DISABLE KEYS */;
INSERT INTO `chitietdathang` VALUES (2,2,2,2,2,2,1,27000),(3,3,3,3,3,3,1,35000),(4,4,4,4,4,4,1,45000),(5,5,5,5,5,5,1,55000),(14,13,3,3,3,3,13,3500000000),(15,14,3,3,3,3,13,3500000000),(16,15,4,4,4,4,5,4500000000),(17,16,3,3,3,3,14,3500000000),(29,28,3,3,3,3,2,3500000000),(30,28,5,5,5,5,2,5500000000),(31,28,7,7,7,7,3,300000000),(32,29,3,3,3,3,1,3500000000),(33,30,4,4,4,4,11,4500000000),(34,30,6,6,6,6,1,500000000),(35,31,7,7,7,7,21,300000000),(36,32,3,3,3,3,1,3500000000),(37,33,3,3,3,3,2,3500000000),(39,35,3,3,3,3,2,3500000000),(40,36,3,3,3,3,2,3500000000),(41,37,3,3,3,3,2,3500000000),(42,37,4,4,4,4,2,4500000000),(43,38,9,9,9,9,2,380000000),(44,39,56,76,59,66,2,5130000000),(45,39,62,78,63,71,4,979999999),(46,40,62,78,64,72,4,979999999),(47,41,63,81,67,75,4,979999999),(48,41,62,79,65,73,1,979999999);
/*!40000 ALTER TABLE `chitietdathang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietnhapxe`
--

DROP TABLE IF EXISTS `chitietnhapxe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietnhapxe` (
  `MaChiTietNhapXe` int NOT NULL AUTO_INCREMENT,
  `MaHoaDonNhap` int DEFAULT NULL,
  `MaModel` int DEFAULT NULL,
  `MaPhienBan` int DEFAULT NULL,
  `MaMauNgoaiThat` int DEFAULT NULL,
  `MaMauNoiThat` int DEFAULT NULL,
  `SoLuong` int DEFAULT NULL,
  `GiaNhap` decimal(30,0) DEFAULT NULL,
  PRIMARY KEY (`MaChiTietNhapXe`),
  KEY `chitietnhapxe_ibfk_1` (`MaPhienBan`),
  KEY `chitietnhapxe_ibfk_2` (`MaMauNgoaiThat`),
  KEY `chitietnhapxe_ibfk_3` (`MaMauNoiThat`),
  KEY `chitietnhapxe_ibfk_4` (`MaHoaDonNhap`),
  KEY `chitietnhapxe_ibfk_5` (`MaModel`),
  CONSTRAINT `chitietnhapxe_ibfk_1` FOREIGN KEY (`MaPhienBan`) REFERENCES `phienbanxe` (`MaPhienBan`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chitietnhapxe_ibfk_2` FOREIGN KEY (`MaMauNgoaiThat`) REFERENCES `maungoaithat` (`MaMauNgoaiThat`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chitietnhapxe_ibfk_3` FOREIGN KEY (`MaMauNoiThat`) REFERENCES `maunoithat` (`MaMauNoiThat`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chitietnhapxe_ibfk_4` FOREIGN KEY (`MaHoaDonNhap`) REFERENCES `hoadonnhapxe` (`MaHoaDonNhap`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chitietnhapxe_ibfk_5` FOREIGN KEY (`MaModel`) REFERENCES `modelxe` (`MaModel`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietnhapxe`
--

LOCK TABLES `chitietnhapxe` WRITE;
/*!40000 ALTER TABLE `chitietnhapxe` DISABLE KEYS */;
INSERT INTO `chitietnhapxe` VALUES (1,1,1,1,1,1,5,20000);
/*!40000 ALTER TABLE `chitietnhapxe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chudebaiviet`
--

DROP TABLE IF EXISTS `chudebaiviet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chudebaiviet` (
  `MaChuDe` int NOT NULL AUTO_INCREMENT,
  `TenChuDe` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HinhAnhChuDe` text COLLATE utf8mb4_unicode_ci,
  `GhiChu` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `HinhAnhTo` text COLLATE utf8mb4_unicode_ci,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaChuDe`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chudebaiviet`
--

LOCK TABLES `chudebaiviet` WRITE;
/*!40000 ALTER TABLE `chudebaiviet` DISABLE KEYS */;
INSERT INTO `chudebaiviet` VALUES (1,'Công nghệ','congnghe.jpg','Công nghệ mới nhất',NULL,'2024-05-09 15:11:39'),(2,'Xe hơi','xehoi.jpg','Cập nhật tin tức về xe hơi',NULL,'2024-05-09 15:11:39'),(3,'Ẩm thực','amthuc.jpg','Các món ăn ngon mỗi ngày',NULL,'2024-05-09 15:11:39'),(4,'Du lịch','dulich.jpg','Kinh nghiệm du lịch hữu ích',NULL,'2024-05-09 15:11:39'),(5,'Sức khỏe','suckhoe.jpg','Bí quyết giữ gìn sức khỏe',NULL,'2024-05-09 15:11:39'),(6,'Thể thao','thethao.jpg','Thông tin về các môn thể thao',NULL,'2024-05-09 15:11:39'),(7,'Gia đình','giadinh.jpg','Chia sẻ kinh nghiệm về gia đình',NULL,'2024-05-09 15:11:39'),(8,'Mẹo vặt','meovat.jpg','Những mẹo vặt trong cuộc sống',NULL,'2024-05-09 15:11:39'),(9,'Phong cách sống','phongcachsong.jpg','Chia sẻ phong cách sống',NULL,'2024-05-09 15:11:39'),(10,'Âm nhạc','amnhac.jpg','Những bản nhạc hot nhất hiện nay',NULL,'2024-05-09 15:11:39'),(11,'test hình ảnh','Quat23.png','no',NULL,'2024-05-25 11:12:12'),(12,'test hình ảnh 2','Quat17.jpg','no',NULL,'2024-05-25 11:27:53');
/*!40000 ALTER TABLE `chudebaiviet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ctusers`
--

DROP TABLE IF EXISTS `ctusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ctusers` (
  `MaCTusers` int NOT NULL AUTO_INCREMENT,
  `TaiKhoanID` bigint unsigned DEFAULT NULL,
  `HoVaTen` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DiaChi` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SDT` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AnhDaiDien` text COLLATE utf8mb4_unicode_ci,
  `CMND` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`MaCTusers`),
  UNIQUE KEY `TaiKhoanID` (`TaiKhoanID`),
  CONSTRAINT `ctusers_ibfk_1` FOREIGN KEY (`TaiKhoanID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctusers`
--

LOCK TABLES `ctusers` WRITE;
/*!40000 ALTER TABLE `ctusers` DISABLE KEYS */;
INSERT INTO `ctusers` VALUES (1,3,'Nguyễn Duy Khang','Hưng Yên','0969588280','TaiKhoan/img_1.jpg','123456789123'),(2,7,'2','hy','123','TaiKhoan/hatchback.png','123'),(5,10,'khang','Hưng Yên','0969588280','TaiKhoan/img_2.gif','012345678912'),(7,6,'Hello World','Việt Nam','0987654321','TaiKhoan/img_2.gif','213213123'),(10,14,'khang2',NULL,NULL,'img_1.jpg',NULL),(11,15,'khang3',NULL,NULL,'img_1.jpg',NULL),(12,16,'test',NULL,NULL,'img_1.jpg',NULL),(13,17,'d',NULL,NULL,'img_1.jpg',NULL),(14,18,'sd',NULL,NULL,'img_1.jpg',NULL),(15,19,'sda',NULL,NULL,'img_1.jpg',NULL),(16,20,'exampleUser',NULL,NULL,'img_1.jpg',NULL),(17,21,'tessss',NULL,NULL,'img_1.jpg',NULL),(18,22,'ads',NULL,NULL,'img_1.jpg',NULL),(19,23,'test2',NULL,NULL,'img_1.jpg',NULL);
/*!40000 ALTER TABLE `ctusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dathang`
--

DROP TABLE IF EXISTS `dathang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dathang` (
  `MaDatHang` int NOT NULL AUTO_INCREMENT,
  `MaKhachHang` int DEFAULT NULL,
  `MaNhanVien` int DEFAULT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  `TongTien` decimal(30,0) DEFAULT NULL,
  `HinhThucNhan` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `DiaChiNhanXe` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`MaDatHang`),
  KEY `dathang_ibfk_2` (`MaNhanVien`),
  KEY `dathang_ibfk_1` (`MaKhachHang`),
  CONSTRAINT `dathang_ibfk_1` FOREIGN KEY (`MaKhachHang`) REFERENCES `khachhang` (`MaKhachHang`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `dathang_ibfk_2` FOREIGN KEY (`MaNhanVien`) REFERENCES `nhanvien` (`MaNhanVien`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dathang`
--

LOCK TABLES `dathang` WRITE;
/*!40000 ALTER TABLE `dathang` DISABLE KEYS */;
INSERT INTO `dathang` VALUES (2,2,NULL,'2024-05-09 15:11:39',2000,'',''),(3,3,NULL,'2024-05-09 15:11:39',1800,'',''),(4,4,NULL,'2024-05-09 15:11:39',2200,'',''),(5,5,NULL,'2024-05-09 15:11:39',1900,'',''),(13,11,NULL,'2024-05-31 11:51:58',45500000000,'Nhận tại địa chỉ khách hàng','Yên Mỹ, Hưng Yên'),(14,11,NULL,'2024-05-31 11:52:11',45500000000,'Nhận tại địa chỉ khách hàng','Yên Mỹ, Hưng Yên'),(15,13,NULL,'2024-05-31 12:06:11',22500000000,'Nhận tại cửa hàng','Vinfast - 118 khu Miếu Thờ, Đường QL3, xã Tiên Dược, huyện Sóc Sơn, Hà Nội'),(16,11,NULL,'2024-05-31 12:19:08',49000000000,'Nhận tại địa chỉ khách hàng','Yên Mỹ, Hưng Yên'),(28,13,NULL,'2024-05-31 14:03:48',18900000000,'Nhận tại cửa hàng','Vinfast - 118 khu Miếu Thờ, Đường QL3, xã Tiên Dược, huyện Sóc Sơn, Hà Nội'),(29,11,14,'2024-05-31 14:08:04',3500000000,'Nhận tại địa chỉ khách hàng','Yên Mỹ, Hưng Yên'),(30,11,NULL,'2024-05-31 23:26:12',50000000000,'Nhận tại cửa hàng','Vinfast - Tầng L1, TTTM Vincom Center Phạm Ngọc Thạch, Số 2 Phạm Ngọc Thạch, Phường Trung Tự, Quận Đống Đa, Hà Nội'),(31,11,14,'2024-06-01 21:03:50',6300000000,'Nhận tại địa chỉ khách hàng','Yên Mỹ, Hưng Yên'),(32,11,NULL,'2024-06-01 22:58:54',3500000000,'Nhận tại cửa hàng','Vinfast - Tầng L1, TTTM Vincom Center Phạm Ngọc Thạch, Số 2 Phạm Ngọc Thạch, Phường Trung Tự, Quận Đống Đa, Hà Nội'),(33,11,14,'2024-06-01 23:02:46',7000000000,'Nhận tại cửa hàng','Vinfast - Tầng L1, TTTM Vincom Center Phạm Ngọc Thạch, Số 2 Phạm Ngọc Thạch, Phường Trung Tự, Quận Đống Đa, Hà Nội'),(35,13,14,'2024-06-08 22:47:57',7000000000,'Nhận tại địa chỉ khách hàng','Thuỵ Trang, Yên Mỹ, Hưng Yên'),(36,13,14,'2024-06-08 22:51:51',7000000000,'Nhận tại cửa hàng','Vinfast - Tầng L1, TTTM Vincom Center Phạm Ngọc Thạch, Số 2 Phạm Ngọc Thạch, Phường Trung Tự, Quận Đống Đa, Hà Nội'),(37,13,14,'2024-06-09 13:23:46',16000000000,'Nhận tại địa chỉ khách hàng','Thuỵ Trang, Yên Mỹ, Hưng Yên'),(38,11,NULL,'2024-06-11 15:20:19',760000000,'Nhận tại cửa hàng','Vinfast - 118 khu Miếu Thờ, Đường QL3, xã Tiên Dược, huyện Sóc Sơn, Hà Nội'),(39,13,NULL,'2024-06-17 20:22:11',14179999996,'Nhận tại địa chỉ khách hàng','Thuỵ Trang, Yên Mỹ, Hưng Yên'),(40,13,NULL,'2024-06-18 10:38:16',3919999996,'Nhận tại cửa hàng','Vinfast - Tầng L1, TTTM Vincom Center Phạm Ngọc Thạch, Số 2 Phạm Ngọc Thạch, Phường Trung Tự, Quận Đống Đa, Hà Nội'),(41,13,14,'2024-06-18 16:20:53',4899999995,'Nhận tại cửa hàng','Vinfast - Tầng L1, TTTM Vincom Center Phạm Ngọc Thạch, Số 2 Phạm Ngọc Thạch, Phường Trung Tự, Quận Đống Đa, Hà Nội');
/*!40000 ALTER TABLE `dathang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hangxe`
--

DROP TABLE IF EXISTS `hangxe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hangxe` (
  `MaHang` int NOT NULL AUTO_INCREMENT,
  `HinhAnhHangXe` text COLLATE utf8mb4_unicode_ci,
  `TenHang` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaHang`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangxe`
--

LOCK TABLES `hangxe` WRITE;
/*!40000 ALTER TABLE `hangxe` DISABLE KEYS */;
INSERT INTO `hangxe` VALUES (1,'hangxe/Toyota.jpg','Toyota','2024-05-09 15:11:39'),(2,'HangXe/Honda.jpg','Honda','2024-05-09 15:11:39'),(3,'HangXe/Ford.jpg','Ford','2024-05-09 15:11:39'),(4,'HangXe/BMW.jpg','BMW','2024-05-09 15:11:39'),(5,'hangxe/Mercedes-Benz.jpg','Mercedes-Benz','2024-05-09 15:11:39'),(6,'HangXe/Audi.jpg','Audi','2024-05-09 15:11:39'),(7,'HangXe/Nissan.jpg','Nissan','2024-05-09 15:11:39'),(8,'HangXe/Chevrolet.jpg','Chevrolet','2024-05-09 15:11:39'),(9,'HangXe/Hyundai.jpg','Hyundai','2024-05-09 15:11:39'),(10,'HangXe/Kia.jpg','Kia','2024-05-09 15:11:39'),(42,'hangxe/66691597d8ccf.jpg','Vinfast','2024-06-12 10:27:19');
/*!40000 ALTER TABLE `hangxe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoadonnhapxe`
--

DROP TABLE IF EXISTS `hoadonnhapxe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoadonnhapxe` (
  `MaHoaDonNhap` int NOT NULL AUTO_INCREMENT,
  `MaNhaCungCap` int DEFAULT NULL,
  `MaNhanVien` int DEFAULT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  `GiaNhap` decimal(30,0) DEFAULT NULL,
  PRIMARY KEY (`MaHoaDonNhap`),
  KEY `hoadonnhapxe_ibfk_1` (`MaNhaCungCap`),
  KEY `hoadonnhapxe_ibfk_2` (`MaNhanVien`),
  CONSTRAINT `hoadonnhapxe_ibfk_1` FOREIGN KEY (`MaNhaCungCap`) REFERENCES `nhacungcap` (`MaNhaCungCap`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhapxe_ibfk_2` FOREIGN KEY (`MaNhanVien`) REFERENCES `nhanvien` (`MaNhanVien`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoadonnhapxe`
--

LOCK TABLES `hoadonnhapxe` WRITE;
/*!40000 ALTER TABLE `hoadonnhapxe` DISABLE KEYS */;
INSERT INTO `hoadonnhapxe` VALUES (1,1,1,'2024-05-09 15:11:39',20000);
/*!40000 ALTER TABLE `hoadonnhapxe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhang` (
  `MaKhachHang` int NOT NULL AUTO_INCREMENT,
  `TaiKhoanID` bigint unsigned DEFAULT NULL,
  `HoVaTen` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CMND` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SDT` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GioiTinh` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  `DiaChi` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`MaKhachHang`),
  KEY `khachhang_ibfk_1` (`TaiKhoanID`),
  CONSTRAINT `khachhang_ibfk_1` FOREIGN KEY (`TaiKhoanID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
INSERT INTO `khachhang` VALUES (2,3,'Tran Thi B','thib@example.com','987654321','444555666','Nữ','2024-05-09 15:11:39','Hưng Yên'),(3,3,'Le Van C','vanc@example.com','111222333','777888999','Nam','2024-05-09 15:11:39',NULL),(4,6,'Pham Thi D','thid@example.com','123456789120','666555444','Nữ','2024-05-09 15:11:39','Hưng Yên'),(5,7,'Hoang Van E','vane@example.com','777888999','333222111','Nam','2024-05-09 15:11:39',NULL),(11,10,'Khang dz','khang@gmail.com','012312312','012312312','Nam','2024-05-31 09:07:36','Yên Mỹ, Hưng Yên'),(13,10,'Nguyễn Duy Khang','duykhang02vnn@gmail.com','03332003323','0969588280','Nam','2024-05-31 12:06:11','Thuỵ Trang, Yên Mỹ, Hưng Yên'),(14,6,'a','a','123','213','Nữ','2024-06-06 22:38:28','a');
/*!40000 ALTER TABLE `khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laithu`
--

DROP TABLE IF EXISTS `laithu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laithu` (
  `MaLaiThu` int NOT NULL AUTO_INCREMENT,
  `MaKhachHang` int NOT NULL,
  `MaModelXe` int NOT NULL,
  `MaNhanVien` int DEFAULT NULL,
  `NgayHen` datetime DEFAULT NULL,
  `DiaChiShowroom` text,
  `GhiChu` text,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaLaiThu`),
  KEY `laithu_fk1_idx` (`MaKhachHang`),
  KEY `laithu_fk2_idx` (`MaModelXe`),
  KEY `laithu_fk3_idx` (`MaNhanVien`),
  CONSTRAINT `laithu_fk1` FOREIGN KEY (`MaKhachHang`) REFERENCES `khachhang` (`MaKhachHang`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `laithu_fk2` FOREIGN KEY (`MaModelXe`) REFERENCES `modelxe` (`MaModel`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `laithu_fk3` FOREIGN KEY (`MaNhanVien`) REFERENCES `nhanvien` (`MaNhanVien`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laithu`
--

LOCK TABLES `laithu` WRITE;
/*!40000 ALTER TABLE `laithu` DISABLE KEYS */;
/*!40000 ALTER TABLE `laithu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaixe`
--

DROP TABLE IF EXISTS `loaixe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaixe` (
  `MaLoaiXe` int NOT NULL AUTO_INCREMENT,
  `HinhAnhLoaiXe` text COLLATE utf8mb4_unicode_ci,
  `TenLoaiXe` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaLoaiXe`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaixe`
--

LOCK TABLES `loaixe` WRITE;
/*!40000 ALTER TABLE `loaixe` DISABLE KEYS */;
INSERT INTO `loaixe` VALUES (1,'LoaiXe/sedan.png','Sedan','2024-05-09 15:11:39'),(2,'LoaiXe/SUV.png','SUV','2024-05-09 15:11:39'),(3,'LoaiXe/hatchback.png','Hatchback','2024-05-09 15:11:39'),(4,'LoaiXe/????????? .png','Crossover','2024-05-09 15:11:39'),(5,'LoaiXe/Coupe.png','Coupe','2024-05-09 15:11:39'),(6,'loaixe6.jpg','Convertible','2024-05-09 15:11:39'),(7,'LoaiXe/Minivan.png','Minivan','2024-05-09 15:11:39'),(8,'LoaiXe/Truck.png','Truck','2024-05-09 15:11:39'),(9,'LoaiXe/Van.png','Van','2024-05-09 15:11:39'),(10,'loaixe10.jpg','Electric','2024-05-09 15:11:39');
/*!40000 ALTER TABLE `loaixe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maungoaithat`
--

DROP TABLE IF EXISTS `maungoaithat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maungoaithat` (
  `MaMauNgoaiThat` int NOT NULL AUTO_INCREMENT,
  `MaPhienBan` int DEFAULT NULL,
  `TenMauNgoaiThat` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `HinhAnhMauNgoaiThat` text COLLATE utf8mb4_unicode_ci,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaMauNgoaiThat`),
  KEY `maungoaithat_ibfk_1` (`MaPhienBan`),
  CONSTRAINT `maungoaithat_ibfk_1` FOREIGN KEY (`MaPhienBan`) REFERENCES `phienbanxe` (`MaPhienBan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maungoaithat`
--

LOCK TABLES `maungoaithat` WRITE;
/*!40000 ALTER TABLE `maungoaithat` DISABLE KEYS */;
INSERT INTO `maungoaithat` VALUES (1,1,'Black','HinhMau/66673705383d4.jpg','2024-05-09 15:11:39'),(2,2,'White','HinhMau/66673705350b1.jpg','2024-05-09 15:11:39'),(3,3,'Silver','HinhMau/666918bbf3277.jpg','2024-05-09 15:11:39'),(4,4,'Red','HinhMau/666737053ccb5.jpg','2024-05-09 15:11:39'),(5,5,'Blue','HinhMau/666918be45a48.jpg','2024-05-09 15:11:39'),(6,6,'Green','HinhMau/666737053ae18.jpg','2024-05-09 15:11:39'),(7,7,'Gray','HinhMau/666918bbf3277.jpg','2024-05-09 15:11:39'),(8,8,'Yellow','HinhMau/66673705383d4.jpg','2024-05-09 15:11:39'),(9,9,'Orange','HinhMau/666737053ae18.jpg','2024-05-09 15:11:39'),(10,10,'Brown','HinhMau/666737053db53.jpg','2024-05-09 15:11:39'),(11,11,'Blue Dark','HinhMau/666918be45a48.jpg','2024-05-28 16:19:26'),(59,76,'Trắng','HinhMau/66673705350b1.jpg','2024-06-11 00:25:25'),(60,76,'Đen','HinhMau/66673705383d4.jpg','2024-06-11 00:25:25'),(61,77,'Trắng','HinhMau/666737053ae18.jpg','2024-06-11 00:25:25'),(62,77,'Xanh dương','HinhMau/666737053db53.jpg','2024-06-11 00:25:25'),(63,78,'Cam','HinhMau/666918bbeb2f0.jpg','2024-06-12 10:40:43'),(64,78,'Xanh dương','HinhMau/666918bbef711.jpg','2024-06-12 10:40:43'),(65,79,'Xám','HinhMau/666918bbf3277.jpg','2024-06-12 10:40:43'),(66,80,'Trắng','HinhMau/666918bc0376d.jpg','2024-06-12 10:40:44'),(67,81,'Cam','HinhMau/666918be4387d.jpg','2024-06-12 10:40:46'),(68,81,'Xanh dương','HinhMau/666918be45a48.jpg','2024-06-12 10:40:46'),(69,82,'Xám','HinhMau/666918be48027.jpg','2024-06-12 10:40:46'),(70,83,'Trắng','HinhMau/666918be4a879.jpg','2024-06-12 10:40:46'),(71,84,'Đen','HinhMau/6670577901aa1.jpg','2024-06-17 22:34:17'),(72,84,'Trắng','HinhMau/6670577906057.jpg','2024-06-17 22:34:17'),(73,85,'Trắng','HinhMau/6670577908739.jpg','2024-06-17 22:34:17'),(74,86,'Đen','HinhMau/6671548643748.jpg','2024-06-18 16:33:58');
/*!40000 ALTER TABLE `maungoaithat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maunoithat`
--

DROP TABLE IF EXISTS `maunoithat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maunoithat` (
  `MaMauNoiThat` int NOT NULL AUTO_INCREMENT,
  `MaMauNgoaiThat` int DEFAULT NULL,
  `TenMauNoiThat` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `SoLuong` int DEFAULT NULL,
  `HinhAnhMauNoiThat` text COLLATE utf8mb4_unicode_ci,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaMauNoiThat`),
  KEY `maunoithat_ibfk_1` (`MaMauNgoaiThat`),
  CONSTRAINT `maunoithat_ibfk_1` FOREIGN KEY (`MaMauNgoaiThat`) REFERENCES `maungoaithat` (`MaMauNgoaiThat`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maunoithat`
--

LOCK TABLES `maunoithat` WRITE;
/*!40000 ALTER TABLE `maunoithat` DISABLE KEYS */;
INSERT INTO `maunoithat` VALUES (1,1,'Black',2000,'HinhMau/666737053745d.jpg','2024-05-09 15:11:39'),(2,2,'White',3000,'HinhMau/666737053745d.jpg','2024-05-09 15:11:39'),(3,3,'Beige',1000,'HinhMau/666737053745d.jpg','2024-05-09 15:11:39'),(4,4,'Gray',2320,'HinhMau/666737053ccb5.jpg','2024-05-09 15:11:39'),(5,5,'Brown',2310,'HinhMau/666737053ccb5.jpg','2024-05-09 15:11:39'),(6,6,'Red',2220,'HinhMau/666737053ccb5.jpg','2024-05-09 15:11:39'),(7,7,'Blue',2000,'HinhMau/666737053e8c8.jpg','2024-05-09 15:11:39'),(8,8,'Green',3550,'HinhMau/666737053e8c8.jpg','2024-05-09 15:11:39'),(9,9,'Orange',4320,'HinhMau/666737053e8c8.jpg','2024-05-09 15:11:39'),(10,10,'Silver',3210,'HinhMau/666737053e8c8.jpg','2024-05-09 15:11:39'),(11,1,'Orange',4310,'HinhMau/666918be4387d.jpg','2024-05-28 16:11:08'),(12,11,'RedSport',4110,'HinhMau/666737053ccb5.jpg','2024-05-28 16:20:23'),(65,59,'Đỏ đô',2000,'HinhMau/6667370536392.jpg','2024-06-11 00:25:25'),(66,59,'Đen',2111,'HinhMau/666737053745d.jpg','2024-06-11 00:25:25'),(67,60,'Đen',20000,'HinhMau/6667370539319.jpg','2024-06-11 00:25:25'),(68,61,'Kem',2000,'HinhMau/666737053beb7.jpg','2024-06-11 00:25:25'),(69,61,'Màu đỏ đô',2000,'HinhMau/666737053ccb5.jpg','2024-06-11 00:25:25'),(70,62,'Kem',1000,'HinhMau/666737053e8c8.jpg','2024-06-11 00:25:25'),(71,63,'Kem',2350,'HinhMau/666918bbee25a.jpg','2024-06-12 10:40:43'),(72,64,'Đen',2000,'HinhMau/666918bbf1129.jpg','2024-06-12 10:40:43'),(73,65,'Đen',20000,'HinhMau/666918bc00de9.jpg','2024-06-12 10:40:44'),(74,66,'Đen',2000,'HinhMau/666918bc04ae1.jpg','2024-06-12 10:40:44'),(75,67,'Kem',2350,'HinhMau/666918be44bee.jpg','2024-06-12 10:40:46'),(76,68,'Đen',2000,'HinhMau/666918be468cf.jpg','2024-06-12 10:40:46'),(77,69,'Đen',20000,'HinhMau/666918be4915c.jpg','2024-06-12 10:40:46'),(78,70,'Đen',2000,'HinhMau/666918be4b7ad.jpg','2024-06-12 10:40:46'),(79,71,'Kem',20000,'6670577904f9d.jpg','2024-06-17 22:34:17'),(80,72,'Xanh',20000,'6670577906fb9.jpg','2024-06-17 22:34:17'),(81,73,'Đen',2000,'667057790960e.jpg','2024-06-17 22:34:17'),(82,74,'Trắng',200,'HinhMau/6671548644c21.jpg','2024-06-18 16:33:58');
/*!40000 ALTER TABLE `maunoithat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modelxe`
--

DROP TABLE IF EXISTS `modelxe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modelxe` (
  `MaModel` int NOT NULL AUTO_INCREMENT,
  `TenModel` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `MaHang` int DEFAULT NULL,
  `MaLoaiXe` int DEFAULT NULL,
  `NamSanXuat` int DEFAULT NULL,
  `Gia` decimal(30,0) DEFAULT NULL,
  `HinhAnhXe` longtext COLLATE utf8mb4_unicode_ci,
  `DSHinhAnhXe` longtext COLLATE utf8mb4_unicode_ci,
  `MoTa` longtext COLLATE utf8mb4_unicode_ci,
  `L100` varchar(245) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NhienLieu` varchar(245) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HopSo` varchar(245) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaModel`),
  KEY `modelxe_ibfk_1` (`MaHang`),
  KEY `modelxe_ibfk_2` (`MaLoaiXe`),
  CONSTRAINT `modelxe_ibfk_1` FOREIGN KEY (`MaHang`) REFERENCES `hangxe` (`MaHang`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `modelxe_ibfk_2` FOREIGN KEY (`MaLoaiXe`) REFERENCES `loaixe` (`MaLoaiXe`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelxe`
--

LOCK TABLES `modelxe` WRITE;
/*!40000 ALTER TABLE `modelxe` DISABLE KEYS */;
INSERT INTO `modelxe` VALUES (1,'Corolla',1,1,2023,2500000000,'ModelXe/6667c3e60b72e.jpg','[\"ModelXe\\/666918bb16a55.png\",\"ModelXe\\/666918bb16f23.jpg\",\"ModelXe\\/666918bb19e57.jpg\",\"ModelXe\\/666918bb1a285.jpeg\"]','<p>Best-selling sedan worldwide.</p>','8 L','Gasoline','Số tự động vô cấp/CVT','2024-05-09 15:11:39'),(2,'Civic',2,1,2023,270000000,'civic.jpg','[\"ModelXe\\/666918bb16a55.png\",\"ModelXe\\/666918bb16f23.jpg\",\"ModelXe\\/666918bb19e57.jpg\",\"ModelXe\\/666918bb1a285.jpeg\"]','Popular compact car from Honda.','6.4L','Gasoline','Số tự động vô cấp/CVT','2024-05-09 15:11:39'),(3,'F-150',3,8,2024,3500000000,'f150.jpg','[\"ModelXe\\/666918bb16a55.png\",\"ModelXe\\/666918bb16f23.jpg\",\"ModelXe\\/666918bb19e57.jpg\",\"ModelXe\\/666918bb1a285.jpeg\"]','Best-selling pickup truck in the US.','6.4L','Gasoline','Số tự động vô cấp/CVT','2024-05-09 15:11:39'),(4,'3 Series',4,2,2023,4500000000,'3series.jpg','[\"ModelXe\\/666918bb16a55.png\",\"ModelXe\\/666918bb16f23.jpg\",\"ModelXe\\/666918bb19e57.jpg\",\"ModelXe\\/666918bb1a285.jpeg\"]','Luxury compact car from BMW.','6.4L','Gasoline','Số tự động vô cấp/CVT','2024-05-09 15:11:39'),(5,'E-Class',5,1,2022,5500000000,'eclass.jpg','[\"ModelXe\\/666918bb16a55.png\",\"ModelXe\\/666918bb16f23.jpg\",\"ModelXe\\/666918bb19e57.jpg\",\"ModelXe\\/666918bb1a285.jpeg\"]','Luxury executive car from Mercedes-Benz.','6.4L','Gasoline','Số tự động vô cấp/CVT','2024-05-09 15:11:39'),(6,'A4',6,1,2023,500000000,'a4.jpg','[\"ModelXe\\/666918bb16a55.png\",\"ModelXe\\/666918bb16f23.jpg\",\"ModelXe\\/666918bb19e57.jpg\",\"ModelXe\\/666918bb1a285.jpeg\"]','Compact executive car from Audi.','8 L','Gasoline','Số tự động vô cấp/CVT','2024-05-09 15:11:39'),(7,'Altima',7,1,2024,300000000,'altima.jpg','[\"ModelXe\\/666918bb16a55.png\",\"ModelXe\\/666918bb16f23.jpg\",\"ModelXe\\/666918bb19e57.jpg\",\"ModelXe\\/666918bb1a285.jpeg\"]','Popular mid-size sedan from Nissan.','6.4L','Gasoline','Số tự động vô cấp/CVT','2024-05-09 15:11:39'),(8,'Silverado',8,8,2022,4000000000,'silverado.jpg','[\"ModelXe\\/666918bb16a55.png\",\"ModelXe\\/666918bb16f23.jpg\",\"ModelXe\\/666918bb19e57.jpg\",\"ModelXe\\/666918bb1a285.jpeg\"]','Full-size pickup truck from Chevrolet.','8 L','Gasoline','Số tự động vô cấp/CVT','2024-05-09 15:11:39'),(9,'Santa Fe',9,2,2023,380000000,'santafe.jpg','[\"ModelXe\\/666918bb16a55.png\",\"ModelXe\\/666918bb16f23.jpg\",\"ModelXe\\/666918bb19e57.jpg\",\"ModelXe\\/666918bb1a285.jpeg\"]','Mid-size SUV from Hyundai.','8 L','Gasoline','Số tự động vô cấp/CVT','2024-05-09 15:11:39'),(10,'Sportage',10,1,2024,320000000,'sportage.jpg','[\"ModelXe\\/666918bb16a55.png\",\"ModelXe\\/666918bb16f23.jpg\",\"ModelXe\\/666918bb19e57.jpg\",\"ModelXe\\/666918bb1a285.jpeg\"]','Compact SUV from Kia.','8 L','Gasoline','Số tự động vô cấp/CVT','2024-05-09 15:11:39'),(56,'BMW X7',4,2,2024,5130000000,'ModelXe/666736ee963ca.jpg','[\"ModelXe/666736ee96845.jpg\",\"ModelXe/666736ee96bfc.jpg\",\"ModelXe/666736ee96f8e.jpg\"]','<h2 style=\"text-align:center;\"><strong>Tổng quan&nbsp;xe&nbsp;BMW X7 2024</strong></h2><p><span style=\"color:rgb(34,34,34);\">Bước vào&nbsp;mô hình nâng cấp giữa vòng đời, BMW X7 2024 vẫn giữ nguyên thông số kích thước như bản tiền nhiệm với các số đo dài x rộng x cao tương ứng &nbsp;5.181 x 2.000 x 1.835&nbsp;(mm) cùng&nbsp;trục cơ sở đạt&nbsp;3.105&nbsp;mm. Các thông số này đã trở thành tiền đề mang đến một ngoại hình to lớn, bệ vệ, đúng chất SUV đầu bảng, giúp X7 luôn nổi bật trên mọi cung đường.</span></p><figure class=\"image image_resized\" style=\"width:68.65%;\"><img style=\"aspect-ratio:1280/854;\" src=\"https://img1.oto.com.vn/2023/11/14/OpzfnMD2/x7-gia-xe-4754.webp\" width=\"1280\" height=\"854\"></figure><h3 style=\"text-align:justify;\"><strong>Ngoại thất&nbsp;xe&nbsp;BMW X7 2024</strong></h3><figure class=\"image image_resized\" style=\"width:68.78%;\"><img style=\"aspect-ratio:1280/854;\" src=\"https://img1.oto.com.vn/2023/11/14/OpzfnMD2/x7-gia-xe2-735a.webp\" width=\"1280\" height=\"854\"></figure><p style=\"text-align:center;\"><i>Khu vực đầu xe BMW X7</i></p><p>Dù là dòng xe SUV thiên về địa hình, hầm hố song những đường nét thiết kế của BMW X7 vẫn toát lên phong cách thể thao, vẻ lịch lãm, sang trọng và đẳng cấp đúng chất xe sang.&nbsp;Hai phiên bản của xe&nbsp;được trang bị gói ngoại thất khác nhau nhằm đáp ứng đa dạng nhu cầu của khách hàng. Trong đó, bản bản xDrive40i M Sport sở hữu gói thiết kế ngoại thất M Sport vành hợp kim 21 inch kiểu 754 M Bicolour và vô lăng thể thao M. Bản xDrive40i Pure Excellence sang trọng hơn với vành hợp kim 22 inch và màu sơn xám Sparkling Copper Grey mới.</p>','16L','Xăng','Số tự động vô cấp/CVT','2024-06-11 00:25:02'),(62,'Lux SA2.0',42,1,2024,979999999,'santafe.jpg','[\"ModelXe\\/666918bb16a55.png\",\"ModelXe\\/666918bb16f23.jpg\",\"ModelXe\\/666918bb19e57.jpg\",\"ModelXe\\/666918bb1a285.jpeg\"]','<h3><span style=\"color:hsl(0, 0%, 0%);\"><strong>Sang trọng &amp; tinh tế</strong></span></h3><p><span style=\"color:hsl(0, 0%, 0%);\">Được cấu thành từ nhôm, gỗ và da Nappa thượng hạng, khoang xe tạo cảm giác cao cấp và trang nhã.</span></p><p>&nbsp;</p>','8.9L','Xăng','Hộp số tự động ZF 8 cấp','2024-06-12 10:40:43'),(63,'Lux A2.0',42,1,2024,979999999,'ModelXe/666918bd84a9c.png','[\"ModelXe\\/666918bd84dba.png\",\"ModelXe\\/666918bd850b6.jpg\",\"ModelXe\\/666918bd85331.jpg\",\"ModelXe\\/666918bd855a2.jpeg\"]','<h3><span style=\"color:hsl(0, 0%, 0%);\"><strong>Sang trọng &amp; tinh tế</strong></span></h3><p><span style=\"color:hsl(0, 0%, 0%);\">Được cấu thành từ nhôm, gỗ và da Nappa thượng hạng, khoang xe tạo cảm giác cao cấp và trang nhã.</span></p><p>&nbsp;</p>','8.9L','Xăng','Hộp số tự động ZF 8 cấp','2024-06-12 10:40:45'),(64,'Corolla',2,2,2002,20000000,'ModelXe/667057783c238.jpg','[\"ModelXe\\/667057783cdcb.jpg\",\"ModelXe\\/667057783d125.jpg\",\"ModelXe\\/667057783d3fc.jpg\"]','<p>test</p>','8 L','Gasoline','Số tự động vô cấp/CVT','2024-06-17 22:34:16'),(65,'Corolla',3,3,2024,20000000,'ModelXe/66715485b3d6e.png','[\"ModelXe\\/66715485b48af.jpg\",\"ModelXe\\/66715485b4d21.png\",\"ModelXe\\/66715485b5115.jpg\"]','<p>2fd</p>','6.4L','Gasoline','Số tự động vô cấp/CVT','2024-06-18 16:33:57');
/*!40000 ALTER TABLE `modelxe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhacungcap`
--

DROP TABLE IF EXISTS `nhacungcap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhacungcap` (
  `MaNhaCungCap` int NOT NULL AUTO_INCREMENT,
  `TenNhaCungCap` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `DiaChi` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SoDienThoai` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaNhaCungCap`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhacungcap`
--

LOCK TABLES `nhacungcap` WRITE;
/*!40000 ALTER TABLE `nhacungcap` DISABLE KEYS */;
INSERT INTO `nhacungcap` VALUES (1,'ABC Auto Parts','123 Supplier St, City','abcparts@example.com','111222333','2024-05-09 15:11:39'),(2,'XYZ Motors','456 Distributor St, Town','xyzmotors@example.com','444555666','2024-05-09 15:11:39'),(3,'123 Auto Supplies','789 Warehouse St, Village','123supplies@example.com','777888999','2024-05-09 15:11:39'),(4,'456 Car Accessories','101 Retailer St, Hamlet','456accessories@example.com','666555444','2024-05-09 15:11:39'),(5,'789 Auto Group','202 Wholesaler St, County','789group@example.com','333222111','2024-05-09 15:11:39'),(6,'ABC Motors','303 Dealer St, Borough','abcmotors@example.com','999888777','2024-05-09 15:11:39'),(7,'XYZ Auto','404 Distributor St, Township','xyzauto@example.com','000111222','2024-05-09 15:11:39'),(8,'123 Auto Parts','505 Supplier St, District','123autoparts@example.com','333444555','2024-05-09 15:11:39'),(9,'456 Motors','606 Retailer St, Province','456motors@example.com','777888999','2024-05-09 15:11:39'),(10,'789 Auto Mall','707 Dealer St, Territory','789mall@example.com','111222333','2024-05-09 15:11:39');
/*!40000 ALTER TABLE `nhacungcap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhanvien`
--

DROP TABLE IF EXISTS `nhanvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhanvien` (
  `MaNhanVien` int NOT NULL AUTO_INCREMENT,
  `TaiKhoanID` bigint unsigned DEFAULT NULL,
  `TenNhanVien` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `ChucVu` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `DiaChi` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `SoDienThoai` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `Luong` decimal(10,2) DEFAULT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  `AnhDaiDien` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`MaNhanVien`),
  KEY `nhanvien_ibfk_1` (`TaiKhoanID`),
  CONSTRAINT `nhanvien_ibfk_1` FOREIGN KEY (`TaiKhoanID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhanvien`
--

LOCK TABLES `nhanvien` WRITE;
/*!40000 ALTER TABLE `nhanvien` DISABLE KEYS */;
INSERT INTO `nhanvien` VALUES (1,14,'Jane Smith','Marketing Coordinator','456 Elm St, Town','987654321',2500.00,'2024-05-09 15:11:39','TaiKhoan/civic.jpg'),(11,20,'exampleUser',NULL,NULL,NULL,NULL,'2024-06-06 21:12:58',NULL),(12,21,'tessss',NULL,NULL,NULL,NULL,'2024-06-06 21:34:15',NULL),(13,23,'test2',NULL,NULL,NULL,NULL,'2024-06-06 22:29:03',NULL),(14,10,'Nguyễn Duy Khang','Chủ Tịch','Việt Nam','0123456789',9999999.00,'2024-06-07 21:37:04','TaiKhoan/eclass.jpg');
/*!40000 ALTER TABLE `nhanvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phienbanxe`
--

DROP TABLE IF EXISTS `phienbanxe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phienbanxe` (
  `MaPhienBan` int NOT NULL AUTO_INCREMENT,
  `MaModel` int DEFAULT NULL,
  `TenPhienBan` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaPhienBan`),
  KEY `phienbanxe_ibfk_1` (`MaModel`),
  CONSTRAINT `phienbanxe_ibfk_1` FOREIGN KEY (`MaModel`) REFERENCES `modelxe` (`MaModel`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phienbanxe`
--

LOCK TABLES `phienbanxe` WRITE;
/*!40000 ALTER TABLE `phienbanxe` DISABLE KEYS */;
INSERT INTO `phienbanxe` VALUES (1,1,'Standard','2024-05-09 15:11:39'),(2,2,'Touring','2024-05-09 15:11:39'),(3,3,'Limited','2024-05-09 15:11:39'),(4,4,'Luxury','2024-05-09 15:11:39'),(5,5,'Performance','2024-05-09 15:11:39'),(6,6,'Premium','2024-05-09 15:11:39'),(7,7,'Platinum','2024-05-09 15:11:39'),(8,8,'Special Edition','2024-05-09 15:11:39'),(9,9,'Elite','2024-05-09 15:11:39'),(10,10,'Ultimate','2024-05-09 15:11:39'),(11,1,'Premium','2024-05-28 16:18:40'),(76,56,'xDrive40i M Sport','2024-06-11 00:25:25'),(77,56,'xDrive40i PE','2024-06-11 00:25:25'),(78,62,'Tiêu chuẩn','2024-06-12 10:40:43'),(79,62,'Nâng cao','2024-06-12 10:40:43'),(80,62,'Cao cấp','2024-06-12 10:40:44'),(81,63,'Tiêu chuẩn','2024-06-12 10:40:46'),(82,63,'Nâng cao','2024-06-12 10:40:46'),(83,63,'Cao cấp','2024-06-12 10:40:46'),(84,64,'Plus','2024-06-17 22:34:16'),(85,64,'Eco','2024-06-17 22:34:17'),(86,65,'Eco','2024-06-18 16:33:58');
/*!40000 ALTER TABLE `phienbanxe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quangcao`
--

DROP TABLE IF EXISTS `quangcao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quangcao` (
  `MaQuangCao` int NOT NULL AUTO_INCREMENT,
  `TrangHienThi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `HinhAnh` text COLLATE utf8mb4_unicode_ci,
  `DSHinhAnh` text COLLATE utf8mb4_unicode_ci,
  `Link` text COLLATE utf8mb4_unicode_ci,
  `TieuDe` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaQuangCao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quangcao`
--

LOCK TABLES `quangcao` WRITE;
/*!40000 ALTER TABLE `quangcao` DISABLE KEYS */;
/*!40000 ALTER TABLE `quangcao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thongsokythuatxe`
--

DROP TABLE IF EXISTS `thongsokythuatxe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thongsokythuatxe` (
  `MaThongSo` int NOT NULL AUTO_INCREMENT,
  `MaModel` int DEFAULT NULL,
  `PhienBanXe` text COLLATE utf8mb4_unicode_ci,
  `LoaiDongCo` text COLLATE utf8mb4_unicode_ci,
  `LoaiHieuDong` text CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `MauSac` text CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `CongSuat` text COLLATE utf8mb4_unicode_ci,
  `MoMenXoan` text COLLATE utf8mb4_unicode_ci,
  `LoaiNhienLieu` text CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `KichThuoc` text COLLATE utf8mb4_unicode_ci,
  `NhienLieuTieuThu100KM` text COLLATE utf8mb4_unicode_ci,
  `HopSo` text COLLATE utf8mb4_unicode_ci,
  `TuiKhi` text COLLATE utf8mb4_unicode_ci,
  `TrongLuong` text CHARACTER SET utf8mb3 COLLATE utf8_general_ci,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaThongSo`),
  KEY `thongsokythuatxe_ibfk_1` (`MaModel`),
  CONSTRAINT `thongsokythuatxe_ibfk_1` FOREIGN KEY (`MaModel`) REFERENCES `modelxe` (`MaModel`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thongsokythuatxe`
--

LOCK TABLES `thongsokythuatxe` WRITE;
/*!40000 ALTER TABLE `thongsokythuatxe` DISABLE KEYS */;
INSERT INTO `thongsokythuatxe` VALUES (1,1,'[\"Standard\",\"Luxury\",\"Limited\"]','[\"2ZR-FE\",\"2ZR-FE\",\"2ZR-FXE\"]','[\"Front-Wheel Drive\",\"Front-Wheel Drive\",\"Front-Wheel Drive\"]','[\"Black\",\"Blue\",\"Green\"]','[\"180\",\"180\",\"200\"]','[\"200Nm\",\"200Nm\",\"220Nm\"]','[\"Gasoline\",\"Gasoline\",\"Gasoline\"]','[\"4460 x 1825 x1620\",\"4460 x 1825 x1620\",\"4460 x 1825 x1620\"]','[\"7.6\",\"7.6\",\"7.6\"]','[\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\"]','[\"6\",\"6\",\"6\"]','[\"1360\",\"1360\",\"1410\"]','2024-05-09 15:11:39'),(2,2,'[\"Standard\",\"Luxury\",\"Limited\"]','[\"Inline-4\",\"Inline-4\",\"Inline-4\"]','[\"Front-Wheel Drive\",\"Front-Wheel Drive\",\"Front-Wheel Drive\"]','[\"Black\",\"Blue\",\"Green\"]','[\"180\",\"180\",\"200\"]','[\"200Nm\",\"200Nm\",\"220Nm\"]','[\"Gasoline\",\"Gasoline\",\"Gasoline\"]','[\"4460 x 1825 x1620\",\"4460 x 1825 x1620\",\"4460 x 1825 x1620\"]','[\"7.6\",\"7.6\",\"7.6\"]','[\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\"]','[\"6\",\"6\",\"6\"]','[\"1360\",\"1360\",\"1410\"]','2024-05-09 15:11:39'),(3,3,'[\"Standard\",\"Luxury\",\"Limited\"]','[\"V6\",\"V6\",\"V8\"]','[\"Front-Wheel Drive\",\"Front-Wheel Drive\",\"Front-Wheel Drive\"]','[\"Black\",\"Blue\",\"Green\"]','[\"180\",\"180\",\"200\"]','[\"200Nm\",\"200Nm\",\"220Nm\"]','[\"Gasoline\",\"Gasoline\",\"Gasoline\"]','[\"4460 x 1825 x1620\",\"4460 x 1825 x1620\",\"4460 x 1825 x1620\"]','[\"7.6\",\"7.6\",\"7.6\"]','[\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\"]','[\"6\",\"6\",\"6\"]','[\"1360\",\"1360\",\"1410\"]','2024-05-09 15:11:39'),(4,4,'[\"Standard\",\"Luxury\",\"Limited\"]','[\"Inline-6\",\"Inline-6\",\"Inline-4\"]','[\"Front-Wheel Drive\",\"Front-Wheel Drive\",\"Front-Wheel Drive\"]','[\"Black\",\"Blue\",\"Green\"]','[\"180\",\"180\",\"200\"]','[\"200Nm\",\"200Nm\",\"220Nm\"]','[\"Gasoline\",\"Gasoline\",\"Gasoline\"]','[\"4460 x 1825 x1620\",\"4460 x 1825 x1620\",\"4460 x 1825 x1620\"]','[\"7.6\",\"7.6\",\"7.6\"]','[\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\"]','[\"6\",\"6\",\"6\"]','[\"1360\",\"1360\",\"1410\"]','2024-05-09 15:11:39'),(5,5,'[\"Standard\",\"Luxury\",\"Limited\"]','[\"V8\",\"V8\",\"V8\"]','[\"Front-Wheel Drive\",\"Front-Wheel Drive\",\"Front-Wheel Drive\"]','[\"Black\",\"Blue\",\"Green\"]','[\"180\",\"180\",\"200\"]','[\"200Nm\",\"200Nm\",\"220Nm\"]','[\"Gasoline\",\"Gasoline\",\"Gasoline\"]','[\"4460 x 1825 x1620\",\"4460 x 1825 x1620\",\"4460 x 1825 x1620\"]','[\"7.6\",\"7.6\",\"7.6\"]','[\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\"]','[\"6\",\"6\",\"6\"]','[\"1360\",\"1360\",\"1410\"]','2024-05-09 15:11:39'),(6,6,'[\"Standard\",\"Luxury\",\"Limited\"]','[\"V6\",\"V6\",\"V8\"]','[\"Front-Wheel Drive\",\"Front-Wheel Drive\",\"Front-Wheel Drive\"]','[\"Black\",\"Blue\",\"Green\"]','[\"180\",\"180\",\"200\"]','[\"200Nm\",\"200Nm\",\"220Nm\"]','[\"Gasoline\",\"Gasoline\",\"Gasoline\"]','[\"4460 x 1825 x1620\",\"4460 x 1825 x1620\",\"4460 x 1825 x1620\"]','[\"7.6\",\"7.6\",\"7.6\"]','[\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\"]','[\"6\",\"6\",\"6\"]','[\"1360\",\"1360\",\"1410\"]','2024-05-09 15:11:39'),(7,7,'[\"Standard\",\"Luxury\",\"Limited\"]','[\"V8\",\"V8\",\"V8\"]','[\"Front-Wheel Drive\",\"Front-Wheel Drive\",\"Front-Wheel Drive\"]','[\"Black\",\"Blue\",\"Green\"]','[\"180\",\"180\",\"200\"]','[\"200Nm\",\"200Nm\",\"220Nm\"]','[\"Gasoline\",\"Gasoline\",\"Gasoline\"]','[\"4460 x 1825 x1620\",\"4460 x 1825 x1620\",\"4460 x 1825 x1620\"]','[\"7.6\",\"7.6\",\"7.6\"]','[\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\"]','[\"6\",\"6\",\"6\"]','[\"1360\",\"1360\",\"1410\"]','2024-05-09 15:11:39'),(8,8,'[\"Standard\",\"Luxury\",\"Limited\"]','[\"V6\",\"V6\",\"V8\"]','[\"Front-Wheel Drive\",\"Front-Wheel Drive\",\"Front-Wheel Drive\"]','[\"Black\",\"Blue\",\"Green\"]','[\"180\",\"180\",\"200\"]','[\"200Nm\",\"200Nm\",\"220Nm\"]','[\"Gasoline\",\"Gasoline\",\"Gasoline\"]','[\"4460 x 1825 x1620\",\"4460 x 1825 x1620\",\"4460 x 1825 x1620\"]','[\"7.6\",\"7.6\",\"7.6\"]','[\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\"]','[\"6\",\"6\",\"6\"]','[\"1360\",\"1360\",\"1410\"]','2024-05-09 15:11:39'),(9,9,'[\"Standard\",\"Luxury\",\"Limited\"]','[\"V6\",\"V6\",\"V8\"]','[\"Front-Wheel Drive\",\"Front-Wheel Drive\",\"Front-Wheel Drive\"]','[\"Black\",\"Blue\",\"Green\"]','[\"180\",\"180\",\"200\"]','[\"200Nm\",\"200Nm\",\"220Nm\"]','[\"Gasoline\",\"Gasoline\",\"Gasoline\"]','[\"4460 x 1825 x1620\",\"4460 x 1825 x1620\",\"4460 x 1825 x1620\"]','[\"7.6\",\"7.6\",\"7.6\"]','[\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\"]','[\"6\",\"6\",\"6\"]','[\"1360\",\"1360\",\"1410\"]','2024-05-09 15:11:39'),(10,10,'[\"Standard\",\"Luxury\",\"Limited\"]','[\"Inline-4\",\"Inline-4\",\"Inline-4\"]','[\"Front-Wheel Drive\",\"Front-Wheel Drive\",\"Front-Wheel Drive\"]','[\"Black\",\"Blue\",\"Green\"]','[\"180\",\"180\",\"200\"]','[\"200Nm\",\"200Nm\",\"220Nm\"]','[\"Gasoline\",\"Gasoline\",\"Gasoline\"]','[\"4460 x 1825 x1620\",\"4460 x 1825 x1620\",\"4460 x 1825 x1620\"]','[\"7.6\",\"7.6\",\"7.6\"]','[\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\",\"Số tự động vô cấp/CVT\"]','[\"6\",\"6\",\"6\"]','[\"1360\",\"1360\",\"1410\"]','2024-05-09 15:11:39'),(18,56,'[\"xDrive40i M Sport\",\"xDrive40i PE\"]','[\"V6\",\"V6\"]','[\"2000HP\",\"2000HP\"]','[\"Đen-Trắng\",\"Đỏ đô\"]','[\"2000HP\"]','[\"2000\"]','[\"Xăng\"]','[\"5.181 x 2.000 x 1.835\",\"5.181 x 2.000 x 1.835\"]','[\"16L\",\"16L\"]','[\"Tự động 8 cấp Steptronic\",\"Tự động 8 cấp Steptronic\"]','[\"6\",\"8\"]','[\"2.415\",\"2.415\"]','2024-06-11 00:25:51'),(19,62,'[\"Tiêu chuẩn\",\"Nâng cao\",\"Cao cấp\",\"\"]','[\"Động cơ 2.0 L - 228 HP\",\"Động cơ 2.0 L - 228 HP\",\"Động cơ 2.0 L - 228 HP\"]','[\"4 bánh toàn thời gian\",\"4 bánh toàn thời gian\",\"4 bánh toàn thời gian\"]','[\"Đen\",\"Trắng\",\"Xanh dương\"]','[\"220 HP\"]','[\"300 Nm\",\"300 Nm\",\"300 Nm\"]','[\"Xăng\",\"Xăng\",\"Xăng\"]','[\"4973 x 1900 x 1500 (mm)\"]','[\"8.39 L\",\"8.32 L\",\"8.32 L\"]','[\"Hộp số tự động ZF 8 cấp\"]','[\"6\"]','[\"2.5\"]','2024-06-12 10:40:43'),(20,63,'[\"Tiêu chuẩn\",\"Nâng cao\",\"Cao cấp\",\"\"]','[\"Động cơ 2.0 L - 228 HP\",\"Động cơ 2.0 L - 228 HP\",\"Động cơ 2.0 L - 228 HP\"]','[\"4 bánh toàn thời gian\",\"4 bánh toàn thời gian\",\"4 bánh toàn thời gian\"]','[\"Đen\",\"Trắng\",\"Xanh dương\"]','[\"220 HP\"]','[\"300 Nm\",\"300 Nm\",\"300 Nm\"]','[\"Xăng\",\"Xăng\",\"Xăng\"]','[\"4973 x 1900 x 1500 (mm)\"]','[\"8.39 L\",\"8.32 L\",\"8.32 L\"]','[\"Hộp số tự động ZF 8 cấp\"]','[\"6\"]','[\"2.5\"]','2024-06-12 10:40:46'),(21,64,'[\"a\"]','[\"a\"]','[\"a\"]','[\"a\"]','[\"a\"]','[\"a\"]','[\"a\"]','[\"a\"]','[\"a\"]','[\"a\"]','[\"a\"]','[\"a\"]','2024-06-17 22:34:16'),(22,65,'[\"eco\",\"pilus\",\"d\"]','[\"eco\",\"pilus\",\"d\"]','[\"eco\",\"pilus\",\"d\"]','[\"eco\",\"pilus\",\"d\"]','[\"eco\",\"pilus\",\"d\"]','[\"eco\",\"pilus\",\"d\"]','[\"eco\",\"pilus\",\"d\"]','[\"eco\",\"pilus\",\"d\"]','[\"eco\",\"pilus\",\"d\"]','[\"eco\",\"pilus\",\"d\"]','[\"eco\",\"pilus\",\"d\"]','[\"eco\",\"pilus\",\"d\"]','2024-06-18 16:33:58');
/*!40000 ALTER TABLE `thongsokythuatxe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trangthaidathang`
--

DROP TABLE IF EXISTS `trangthaidathang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trangthaidathang` (
  `MaTrangThai` int NOT NULL AUTO_INCREMENT,
  `MaDatHang` int DEFAULT NULL,
  `TrangThai` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `NgayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  `CoTrangThai` int DEFAULT NULL,
  PRIMARY KEY (`MaTrangThai`),
  KEY `trangthaidathang_ibfk_1` (`MaDatHang`),
  CONSTRAINT `trangthaidathang_ibfk_1` FOREIGN KEY (`MaDatHang`) REFERENCES `dathang` (`MaDatHang`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trangthaidathang`
--

LOCK TABLES `trangthaidathang` WRITE;
/*!40000 ALTER TABLE `trangthaidathang` DISABLE KEYS */;
INSERT INTO `trangthaidathang` VALUES (1,28,'Chờ liên hệ xác nhận','2024-05-31 14:03:48',2),(2,29,'Chờ liên hệ xác nhận','2024-05-31 14:08:04',2),(3,28,'Nhân viên xác nhận đơn hàng, đang tiến hành thủ tục','2024-05-31 19:48:25',1),(4,30,'Chờ liên hệ xác nhận','2024-05-31 23:26:12',2),(5,31,'Chờ liên hệ xác nhận','2024-06-01 21:03:50',2),(6,32,'Chờ liên hệ xác nhận','2024-06-01 22:58:54',2),(7,33,'Chờ liên hệ xác nhận','2024-06-01 23:02:47',2),(9,30,'Nhân viên xác nhận đơn hàng, đang tiến hành thủ tục','2024-06-07 21:53:28',1),(10,29,'Nhân viên xác nhận đơn hàng, đang tiến hành thủ tục','2024-06-07 21:54:24',2),(14,31,'Nhân viên xác nhận đơn hàng, đang tiến hành thủ tục','2024-06-07 21:55:38',2),(15,33,'Nhân viên xác nhận đơn hàng, đang tiến hành thủ tục','2024-06-07 21:56:43',2),(16,29,'Hoàn thành thủ tục, đang tiến hành giao xe ô tô','2024-06-07 23:23:53',2),(17,29,'Hoàn thành giao xe và thanh toán','2024-06-07 23:35:07',1),(18,33,'Hoàn thành thủ tục, đang tiến hành giao xe ô tô','2024-06-07 23:38:10',2),(19,32,'Đã huỷ','2024-06-08 11:40:13',1),(20,35,'Chờ liên hệ xác nhận','2024-06-08 22:47:57',2),(21,35,'Nhân viên xác nhận đơn hàng, đang tiến hành thủ tục','2024-06-08 22:49:29',2),(22,35,'Hoàn thành thủ tục, đang tiến hành giao xe ô tô','2024-06-08 22:49:45',2),(23,35,'Hoàn thành giao xe và thanh toán','2024-06-08 22:49:57',1),(24,36,'Chờ liên hệ xác nhận','2024-06-08 22:51:51',2),(25,36,'Nhân viên xác nhận đơn hàng, đang tiến hành thủ tục','2024-06-08 22:52:25',2),(26,37,'Chờ liên hệ xác nhận','2024-06-09 13:23:46',2),(27,38,'Chờ liên hệ xác nhận','2024-06-11 15:20:19',1),(28,39,'Chờ liên hệ xác nhận','2024-06-17 20:22:11',1),(29,40,'Chờ liên hệ xác nhận','2024-06-18 10:38:16',2),(30,40,'Đã huỷ','2024-06-18 10:38:33',1),(31,37,'Nhân viên xác nhận đơn hàng, đang tiến hành thủ tục','2024-06-18 10:40:42',1),(32,31,'Hoàn thành thủ tục, đang tiến hành giao xe ô tô','2024-06-18 10:41:00',1),(33,33,'Hoàn thành giao xe và thanh toán','2024-06-18 10:41:08',1),(34,41,'Chờ liên hệ xác nhận','2024-06-18 16:20:53',2),(35,41,'Nhân viên xác nhận đơn hàng, đang tiến hành thủ tục','2024-06-18 16:25:04',2),(36,36,'Hoàn thành thủ tục, đang tiến hành giao xe ô tô','2024-06-18 16:25:26',1),(37,41,'Hoàn thành thủ tục, đang tiến hành giao xe ô tô','2024-06-18 16:25:42',2),(38,41,'Hoàn thành giao xe và thanh toán','2024-06-18 16:26:12',1);
/*!40000 ALTER TABLE `trangthaidathang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'admin','2@gmail.com','$2y$10$Blwj09yfogGDK58II7hsY.uDX5XMpyiYQxI9VeEeID.LbK0XOrIfy',0,'2024-05-14 07:24:54','2024-06-07 00:40:09'),(6,'3','3@gmail.com','$2y$10$kvc2MrxcqCWyIT9Wjv6/RO0mMgxkMTNWdS9Rj0ZULffMKhsCk8wE6',2,'2024-05-14 07:38:00','2024-05-14 07:38:00'),(7,'2','khang2@gmail.com','$2y$10$Ly4SfaW56bhkZDS4g.MXzuXD43azkaDB8mMVfYDHto414ISevcwyi',2,'2024-05-25 00:40:35','2024-05-25 00:40:35'),(10,'khang','khang@gmail.com','$2y$10$Kvay79hLn.ertvllWM/FO.dCWIZhBNCCRCthS2nbdA9YcsmCMC5Za',0,'2024-05-25 00:53:27','2024-06-06 01:58:39'),(14,'khang2','duykhang02vnn@gmail.com','$2y$10$lQ2gokyEDz54ljYtvWupLu8JQSIFz7/4vCXD/0ju6JryqC0ABXOLS',1,'2024-06-06 06:40:08','2024-06-06 06:40:08'),(15,'khang3','khang3@a.dd','$2y$10$TJkOOrRsPPA6ude6yQCq1eDwwBWTnIY9F1tOTaz6DbaKFnbEHXBLC',1,'2024-06-06 06:58:04','2024-06-06 06:58:04'),(16,'test','test@gma.cs','$2y$10$5vGkpi4G7gx2h3QmIeUCvetNd4oBEeEWmKRllF2BRAxFCRe0U7cSG',1,'2024-06-06 07:05:20','2024-06-06 07:05:20'),(17,'d','d@d.fsd','$2y$10$PegxQToSAgVar/giMclA0eIBFtFokCY3k/0Xsc3ZaGs2JB7xNF.M.',1,'2024-06-06 07:08:50','2024-06-06 07:08:50'),(18,'sd','s2@f.hg','$2y$10$JDGIO/PTYHQW.milUZmK9.p6yVQ60ZHDLZfWlQZ4dXAE5LLaGJPaK',1,'2024-06-06 07:09:46','2024-06-06 07:09:46'),(19,'sda','ds@d.jkk','$2y$10$pWST2PL4D02rWp4GleH/J.VE1v0ABFkIn4BDHhPXfMXbn0HMkt1wu',1,'2024-06-06 07:10:33','2024-06-06 07:10:33'),(20,'exampleUser','example@example.com','$2y$10$sY3Wfa0T90elbcUCEFSQg.328lLGiZbYya7rU/AhZugehB5PdASkO',1,'2024-06-06 07:12:58','2024-06-06 07:12:58'),(21,'tessss','lolhy44@gmail.com','$2y$10$h7c3y5A59SLveMTvqbJbTOlUzASVcGxmlHcc0OwvqaZDco5IClyw6',1,'2024-06-06 07:34:15','2024-06-06 07:34:15'),(22,'ads','dsas@ad.dsd','$2y$10$SQPF4DDue50osfm71bDRru/LuH5KMf4zyT1FoKViTFjLQVhrL5q2W',1,'2024-06-06 08:27:48','2024-06-06 08:27:48'),(23,'test2','test2@gmail.com','$2y$10$cmQF.CieWEzfLzTsTuFuneg7eQ2MLsdVJcL0BQQtU7b71fmx/8VAS',1,'2024-06-06 08:29:03','2024-06-06 08:29:03');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-01 19:25:06
