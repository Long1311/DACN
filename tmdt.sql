-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: tmdt
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `selected` tinyint(1) DEFAULT '1',
  `soluong` int NOT NULL,
  `cart_id` bigint NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `variant_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpcttvuq4mxppo8sxggjtn5i2c` (`cart_id`),
  KEY `fk_cart_items_variant` (`variant_id`),
  CONSTRAINT `fk_cart_items_variant` FOREIGN KEY (`variant_id`) REFERENCES `sanpham_variant` (`id`),
  CONSTRAINT `FKpcttvuq4mxppo8sxggjtn5i2c` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (0,1,2,83,31),(1,1,2,84,27);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb5o626f86h46m4s7ms6ginnop` (`user_id`),
  CONSTRAINT `FKb5o626f86h46m4s7ms6ginnop` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhmuc`
--

DROP TABLE IF EXISTS `danhmuc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danhmuc` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tendm` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhmuc`
--

LOCK TABLES `danhmuc` WRITE;
/*!40000 ALTER TABLE `danhmuc` DISABLE KEYS */;
INSERT INTO `danhmuc` VALUES (1,'Iphone'),(2,'Samsung'),(3,'PhuKien');
/*!40000 ALTER TABLE `danhmuc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `gia` double DEFAULT NULL,
  `soluong` int NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint DEFAULT NULL,
  `variant_id` bigint DEFAULT NULL,
  `tensp` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `storage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  KEY `fk_order_items_variant` (`variant_id`),
  CONSTRAINT `fk_order_items_variant` FOREIGN KEY (`variant_id`) REFERENCES `sanpham_variant` (`id`),
  CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (9000000,1,30,36,1,NULL,NULL,NULL),(10500000,1,31,36,2,NULL,NULL,NULL),(9000000,1,32,37,1,'iPhone 15 Pro','Hồng','256GB'),(9500000,1,33,37,3,'Samsung Galaxy S23','Đen','128GB'),(10500000,1,34,37,2,'iPhone 15 Pro','Đen','512GB'),(9000000,1,35,38,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,2,36,39,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,37,40,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,38,41,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,39,42,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,40,43,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,2,41,44,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,42,45,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,43,46,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,44,47,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,45,48,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,46,49,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,47,50,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,48,51,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,49,52,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,50,53,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,51,54,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,52,55,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,53,56,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,54,57,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,55,58,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,56,59,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,57,60,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,58,61,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,59,62,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,60,63,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,61,64,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,62,65,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,63,66,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,64,67,1,'iPhone 15 Pro','Hồng','256GB'),(10500000,1,65,67,2,'iPhone 15 Pro','Đen','512GB'),(9000000,2,77,79,1,'iPhone 15 Pro','Hồng','256GB'),(10500000,1,78,79,2,'iPhone 15 Pro','Đen','512GB'),(9000000,1,80,81,1,'iPhone 15 Pro','Hồng','256GB'),(10500000,1,81,81,2,'iPhone 15 Pro','Đen','512GB'),(9500000,1,82,81,3,'Samsung Galaxy S23','Đen','128GB'),(9000000,1,83,82,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,84,83,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,85,84,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,86,85,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,87,86,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,88,87,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,89,88,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,90,89,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,91,90,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,92,91,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,93,92,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,94,93,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,95,94,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,96,95,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,97,96,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,98,97,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,99,98,1,'iPhone 15 Pro','Hồng','256GB'),(10500000,1,100,99,2,'iPhone 15 Pro','Đen','512GB'),(9000000,2,101,100,1,'iPhone 15 Pro','Hồng','256GB'),(9500000,1,102,100,3,'Samsung Galaxy S23','Đen','128GB'),(9000000,1,103,101,1,'iPhone 15 Pro','Hồng','256GB'),(9000000,1,104,102,1,'iPhone 15 Pro','Hồng','256GB'),(18000000,1,105,103,4,'Samsung Galaxy S23','Trắng','256GB'),(18000000,1,106,104,4,'Samsung Galaxy S23','Trắng','256GB'),(15000000,1,107,105,7,'Samsung Z Flip 6','Xanh Rêu','256GB'),(15000000,1,108,106,7,'Samsung Z Flip 6','Xanh Rêu','256GB'),(16000000,2,109,107,34,'iphone 15','Hồng','1TB'),(16000000,2,110,108,34,'iphone 15','Hồng','1TB'),(16000000,2,111,109,34,'iphone 15','Hồng','1TB'),(16000000,2,112,110,34,'iphone 15','Hồng','1TB'),(20500000,1,113,111,26,'Samsung Galaxy S23','Trắng','1TB'),(20500000,1,114,112,26,'Samsung Galaxy S23','Trắng','1TB'),(15000000,1,115,113,27,'Samsung Z Flip 6','Xanh Rêu','128GB'),(15000000,1,116,114,27,'Samsung Z Flip 6','Xanh Rêu','128GB'),(15000000,1,117,115,27,'Samsung Z Flip 6','Xanh Rêu','128GB'),(15000000,1,118,116,27,'Samsung Z Flip 6','Xanh Rêu','128GB'),(15000000,1,119,117,27,'Samsung Z Flip 6','Xanh Rêu','128GB'),(15000000,1,120,118,27,'Samsung Z Flip 6','Xanh Rêu','128GB'),(12900000,1,123,121,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,124,122,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,125,123,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,126,124,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,127,125,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,128,126,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,129,127,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,130,128,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,131,129,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,132,130,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,133,131,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,134,132,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,135,133,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,136,134,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,139,137,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,140,138,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,141,139,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,142,140,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,143,141,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,144,142,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,145,143,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,146,144,1,'iPhone 15 Pro','Hồng','256GB'),(12900000,1,147,145,1,'iPhone 15 Pro','Hồng','256GB'),(16000000,1,148,146,3,'Samsung Galaxy S23','Đen','128GB'),(14000000,1,149,147,16,'iPhone 15 Pro','Đen','256GB'),(18500000,3,150,148,18,'iPhone 15 Pro','Hồng','1TB'),(17500000,1,151,149,29,'Samsung Z Flip 6','Xanh Rêu','1TB'),(17500000,1,152,150,29,'Samsung Z Flip 6','Xanh Rêu','1TB'),(12000000,1,153,151,31,'iphone 15','Hồng','128GB'),(12000000,1,154,152,31,'iphone 15','Hồng','128GB'),(15000000,1,155,153,27,'Samsung Z Flip 6','Xanh Rêu','128GB');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `thanhtien` double DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `trangthai` varchar(255) DEFAULT NULL,
  `ngaydat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (19500000,36,2,'CANCELLED','2025-05-15 10:00:00'),(29000000,37,2,'COMPLETED','2025-05-15 11:05:00'),(9000000,38,2,'CANCELLED','2025-05-16 10:00:00'),(18000000,39,2,'COMPLETED','2025-05-17 10:00:00'),(9000000,40,2,'COMPLETED','2025-05-18 10:00:00'),(9000000,41,2,'COMPLETED','2025-05-19 10:00:00'),(9000000,42,2,'CANCELLED','2025-05-20 10:00:00'),(9000000,43,2,'COMPLETED','2025-05-21 10:00:00'),(18000000,44,2,'COMPLETED','2025-06-10 14:30:00'),(9000000,45,2,'COMPLETED','2025-06-11 09:00:00'),(9000000,46,2,'COMPLETED','2025-06-12 18:00:00'),(9000000,47,2,'COMPLETED','2025-06-25 14:30:00'),(9000000,48,2,'COMPLETED','2025-06-26 09:00:00'),(9000000,49,2,'CANCELLED','2025-06-29 18:00:00'),(9000000,50,2,'CANCELLED','2025-06-29 19:00:00'),(9000000,51,2,'CANCELLED','2025-06-29 21:00:00'),(9000000,52,2,'CANCELLED','2025-06-29 23:00:00'),(9000000,53,2,'CANCELLED','2025-07-10 01:17:57'),(9000000,54,2,'COMPLETED','2025-07-10 01:20:43'),(9000000,55,2,'CANCELLED','2025-07-11 22:19:53'),(9000000,56,2,'CANCELLED','2025-07-11 22:39:52'),(9000000,57,2,'CANCELLED','2025-07-11 23:20:19'),(9000000,58,2,'CANCELLED','2025-07-11 23:23:32'),(9000000,59,2,'CANCELLED','2025-07-11 23:24:32'),(9000000,60,2,'COMPLETED','2025-07-11 23:25:11'),(9000000,61,2,'SHIPPING','2025-07-11 23:33:01'),(9000000,62,2,'COMPLETED','2025-07-11 23:33:20'),(9000000,63,2,'SHIPPING','2025-07-12 15:32:24'),(9000000,64,2,'SHIPPING','2025-07-12 15:52:20'),(9000000,65,2,'SHIPPING','2025-07-12 15:58:51'),(9000000,66,2,'SHIPPING','2025-07-12 15:59:09'),(19500000,67,2,'SHIPPING','2025-07-12 17:40:50'),(28500000,79,2,'PENDING','2025-07-14 14:56:26'),(29000000,81,2,'PENDING','2025-07-14 15:39:13'),(9000000,82,2,'PENDING','2025-07-14 15:53:55'),(9000000,83,2,'PENDING','2025-07-14 16:09:35'),(9000000,84,2,'PENDING','2025-07-14 16:11:50'),(9000000,85,2,'PENDING','2025-07-14 16:17:32'),(9000000,86,2,'COMPLETED','2025-07-14 16:17:39'),(9000000,87,2,'COMPLETED','2025-07-14 16:19:04'),(9000000,88,2,'COMPLETED','2025-07-14 16:21:58'),(9000000,89,2,'CANCELLED','2025-07-14 16:53:10'),(9000000,90,2,'COMPLETED','2025-07-14 17:22:04'),(9000000,91,2,'COMPLETED','2025-07-14 17:22:46'),(9000000,92,2,'COMPLETED','2025-07-14 17:22:48'),(9000000,93,2,'CANCELLED','2025-07-14 17:23:10'),(9000000,94,2,'COMPLETED','2025-07-14 17:23:34'),(9000000,95,2,'PENDING','2025-07-14 17:26:04'),(9000000,96,2,'PENDING','2025-07-14 17:26:12'),(9000000,97,2,'CANCELLED','2025-07-14 17:27:35'),(9000000,98,2,'PENDING','2025-07-14 17:41:17'),(10500000,99,2,'PENDING','2025-07-14 17:41:24'),(27500000,100,2,'PENDING','2025-07-14 17:42:38'),(9000000,101,2,'PENDING','2025-07-14 17:51:41'),(9000000,102,2,'PENDING','2025-07-14 17:51:42'),(18000000,103,2,'PENDING','2025-07-21 15:35:46'),(18000000,104,2,'PENDING','2025-07-21 15:35:46'),(15000000,105,2,'PENDING','2025-07-21 15:36:38'),(15000000,106,2,'PENDING','2025-07-21 15:36:38'),(32000000,107,2,'PENDING','2025-07-23 00:03:31'),(32000000,108,2,'PENDING','2025-07-23 00:03:31'),(32000000,109,2,'PENDING','2025-07-23 00:17:34'),(32000000,110,2,'PENDING','2025-07-23 00:17:34'),(20500000,111,2,'PENDING','2025-07-23 00:28:38'),(20500000,112,2,'PENDING','2025-07-23 00:28:38'),(15000000,113,2,'PENDING','2025-07-23 00:43:14'),(15000000,114,2,'PENDING','2025-07-23 00:43:15'),(15000000,115,2,'PENDING','2025-07-23 00:49:23'),(15000000,116,2,'PENDING','2025-07-23 00:49:24'),(27000000,117,2,'PENDING','2025-07-23 00:57:56'),(27000000,118,2,'PENDING','2025-07-23 00:57:56'),(27000000,119,2,'PENDING','2025-07-23 01:03:36'),(27000000,120,2,'PENDING','2025-07-23 01:03:37'),(12900000,121,2,'PENDING','2025-07-23 01:28:40'),(12900000,122,2,'PENDING','2025-07-23 01:28:40'),(12900000,123,2,'PENDING','2025-07-23 01:44:59'),(12900000,124,2,'PENDING','2025-07-23 01:44:59'),(12900000,125,2,'PENDING','2025-07-23 13:11:26'),(12900000,126,2,'PENDING','2025-07-23 13:11:26'),(12900000,127,2,'PENDING','2025-07-23 13:47:47'),(12900000,128,2,'PENDING','2025-07-23 13:47:47'),(28900000,129,2,'PENDING','2025-07-23 14:28:16'),(28900000,130,2,'PENDING','2025-07-23 14:46:52'),(28900000,131,2,'PENDING','2025-07-23 14:57:06'),(12900000,132,2,'PENDING','2025-07-23 15:39:27'),(28900000,133,2,'PENDING','2025-07-23 15:56:02'),(12900000,134,2,'PENDING','2025-07-23 16:22:26'),(12900000,137,2,'PENDING','2025-07-23 17:33:34'),(12900000,138,2,'PENDING','2025-07-23 19:54:59'),(12900000,139,2,'PENDING','2025-07-24 00:10:25'),(12900000,140,2,'PENDING','2025-07-24 00:11:27'),(12900000,141,2,'PENDING','2025-07-24 00:28:37'),(12900000,142,2,'PENDING','2025-07-24 00:44:09'),(12900000,143,2,'PENDING','2025-07-24 00:45:08'),(12900000,144,2,'PENDING','2025-07-24 01:13:45'),(12900000,145,2,'PENDING','2025-07-24 01:53:37'),(16000000,146,2,'PENDING','2025-07-24 03:04:01'),(14000000,147,2,'PENDING','2025-07-24 15:31:32'),(55500000,148,2,'PENDING','2025-07-24 22:19:33'),(17500000,149,2,'PENDING','2025-07-24 22:30:24'),(17500000,150,2,'PENDING','2025-07-24 23:01:14'),(12000000,151,2,'PENDING','2025-07-24 23:20:18'),(12000000,152,2,'PENDING','2025-07-24 23:20:41'),(15000000,153,2,'PENDING','2025-07-24 23:27:56');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `loai` bigint DEFAULT NULL,
  `battery` varchar(255) DEFAULT NULL,
  `camera` varchar(255) DEFAULT NULL,
  `cpu` varchar(255) DEFAULT NULL,
  `front_camera` varchar(255) DEFAULT NULL,
  `os` varchar(255) DEFAULT NULL,
  `ram` varchar(255) DEFAULT NULL,
  `screen` varchar(255) DEFAULT NULL,
  `tensp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9xppq9nk47qty9akqrj8a7j48` (`loai`),
  CONSTRAINT `FK9xppq9nk47qty9akqrj8a7j48` FOREIGN KEY (`loai`) REFERENCES `danhmuc` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,1,'4380 mAh','48MP','A17 Pro','12MP','iOS 17','6GB','OLED 6.1 inch','iPhone 15 Pro'),(2,2,'3900 mAh','50MP','Snapdragon 8 Gen 2','12MP','Android 13','8GB','Dynamic AMOLED 6.1 inch','Samsung Galaxy S23'),(3,1,'4380 mAh','48MP','A17 Pro','12MP','iOS 17','6GB','OLED 6.1 inch','iphone 15'),(6,2,'3700 mAh','50MP','Snapdragon 8 Gen 3','10MP','Android 14','8GB','Foldable AMOLED 6.7 inch','Samsung Z Flip 6'),(10,1,'3240 mAh','12MP','A15 Bionic','12MP','iOS 15','4GB','OLED 6.1 inch','iphone 13');
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham_colors`
--

DROP TABLE IF EXISTS `sanpham_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham_colors` (
  `sanpham_id` bigint NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  KEY `FKtqdtp86uqnosq4445ioircs8` (`sanpham_id`),
  CONSTRAINT `FKtqdtp86uqnosq4445ioircs8` FOREIGN KEY (`sanpham_id`) REFERENCES `sanpham` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham_colors`
--

LOCK TABLES `sanpham_colors` WRITE;
/*!40000 ALTER TABLE `sanpham_colors` DISABLE KEYS */;
INSERT INTO `sanpham_colors` VALUES (1,'Hồng'),(1,'Đen'),(1,'Xanh Dương'),(2,'Đen'),(2,'Trắng'),(2,'Xanh');
/*!40000 ALTER TABLE `sanpham_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham_storage`
--

DROP TABLE IF EXISTS `sanpham_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham_storage` (
  `sanpham_id` bigint NOT NULL,
  `storage` varchar(255) DEFAULT NULL,
  KEY `FKlyo2yf3qstuqab5d3h75cnakp` (`sanpham_id`),
  CONSTRAINT `FKlyo2yf3qstuqab5d3h75cnakp` FOREIGN KEY (`sanpham_id`) REFERENCES `sanpham` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham_storage`
--

LOCK TABLES `sanpham_storage` WRITE;
/*!40000 ALTER TABLE `sanpham_storage` DISABLE KEYS */;
INSERT INTO `sanpham_storage` VALUES (1,'256GB'),(1,'512GB'),(2,'128GB'),(2,'256GB');
/*!40000 ALTER TABLE `sanpham_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham_variant`
--

DROP TABLE IF EXISTS `sanpham_variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham_variant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `sanpham_id` bigint NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `storage` varchar(255) DEFAULT NULL,
  `gia` double DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `soluong` int DEFAULT NULL,
  `disabled` bit(1) NOT NULL,
  `original_price` double DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `review_count` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sanpham_id` (`sanpham_id`),
  CONSTRAINT `sanpham_variant_ibfk_1` FOREIGN KEY (`sanpham_id`) REFERENCES `sanpham` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham_variant`
--

LOCK TABLES `sanpham_variant` WRITE;
/*!40000 ALTER TABLE `sanpham_variant` DISABLE KEYS */;
INSERT INTO `sanpham_variant` VALUES (1,1,'Hồng','256GB',12900000,'ip15pro_hong.jpg',27,_binary '',15000000,14,'2025-06-15 10:00:00.000000',0,0),(2,1,'Đen','512GB',12000000,'ip15pro_den.jpg',10,_binary '\0',17000000,29,'2025-06-16 10:00:00.000000',0,0),(3,2,'Đen','128GB',16000000,'s23_den.jpg',39,_binary '\0',18000000,11,'2025-06-17 10:00:00.000000',0,0),(4,2,'Trắng','256GB',18000000,'s23_trang.jpg',25,_binary '\0',20000000,10,'2025-06-18 10:00:00.000000',0,0),(7,6,'Xanh Rêu','256GB',15000000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1752993285/ztpo8cuabjt3ygksjt9i.jpg',20,_binary '\0',17000000,12,'2025-07-01 09:00:00.000000',0,0),(11,10,'Trắng','128GB',10499998,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1752999684/hppicr5wycbwipcstajx.jpg',50,_binary '\0',10499998,0,'2025-07-05 09:00:00.000000',0,0),(12,10,'Trắng','64GB',9000000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753004416/fuoqo5nfhdwmrvjprzg6.jpg',4,_binary '\0',9000000,0,'2025-07-07 09:00:00.000000',0,0),(13,10,'Trắng','256GB',11499998,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753035613/axf7xxtyzrwvdxe0yhun.jpg',7,_binary '\0',11499998,0,'2025-07-09 09:00:00.000000',0,0),(15,1,'Hồng','512GB',15500000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753167724/z1iixczwjnxuf7xcbzkq.png',6,_binary '\0',18000000,14,'2025-07-22 14:02:12.641000',0,0),(16,1,'Đen','256GB',14000000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753167824/fedd3mumyhnu00mtyulp.jpg',9,_binary '\0',14000000,0,'2025-07-22 14:03:47.698000',0,0),(17,1,'Hồng','128GB',11500000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753169892/oeudzzbtugwulory5c84.png',3,_binary '\0',14000000,18,'2025-07-22 14:38:59.094000',0,0),(18,1,'Hồng','1TB',18500000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753169954/zxsci4daycms4us9tago.png',0,_binary '\0',20000000,8,'2025-07-22 14:39:47.955000',0,0),(19,1,'Đen','128GB',13500000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753170014/vovlo6l5jzclu6rsopf4.jpg',5,_binary '\0',13500000,0,'2025-07-22 14:40:46.927000',0,0),(20,1,'Đen','1TB',17500000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753170054/ckyaehbzcpx7roh2zucg.jpg',2,_binary '\0',19000000,8,'2025-07-22 14:41:27.785000',0,0),(21,2,'Đen','256GB',18500000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753170126/nsoaxanv3d1lfkycah2p.jpg',3,_binary '\0',18500000,0,'2025-07-22 14:43:23.017000',0,0),(22,2,'Đen','512GB',17500000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753170226/dmodkkp5cjdvmleg0vbi.jpg',2,_binary '\0',19000000,8,'2025-07-22 14:44:07.878000',0,0),(23,2,'Đen','1TB',18500000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753170256/okrkvprwntfy0dczzpum.jpg',2,_binary '\0',20000000,8,'2025-07-22 14:44:39.151000',0,0),(24,2,'Trắng','128GB',18000000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753170335/fetzpkj9n6ag4udrtdau.jpg',5,_binary '\0',18000000,0,'2025-07-22 14:46:11.805000',0,0),(25,2,'Trắng','512GB',18500000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753170387/olicaylfczobszrmbbtm.jpg',3,_binary '\0',21000000,12,'2025-07-22 14:46:47.839000',0,0),(26,2,'Trắng','1TB',20500000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753170420/r9aczxmnbheiqyvazm3y.jpg',0,_binary '\0',22000000,7,'2025-07-22 14:47:10.935000',0,0),(27,6,'Xanh Rêu','128GB',15000000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753170516/nqlna81vjzamjwrhdl0q.jpg',4,_binary '\0',16500000,9,'2025-07-22 14:49:20.088000',0,0),(28,6,'Xanh Rêu','512GB',16500000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753170601/wvwckq5y7ojakp03xpub.jpg',5,_binary '\0',18000000,8,'2025-07-22 14:50:36.308000',0,0),(29,6,'Xanh Rêu','1TB',17500000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753170648/eosj35t4fttzhlbqulh1.jpg',1,_binary '\0',19000000,8,'2025-07-22 14:51:10.225000',0,0),(30,10,'Trắng','512GB',12500000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753170817/s1irvkooxxdp1hh2rn7f.jpg',5,_binary '\0',12500000,0,'2025-07-22 14:54:10.906000',0,0),(31,3,'Hồng','128GB',12000000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753170901/npkqqf2kohys7qvxexjj.png',8,_binary '\0',13000000,8,'2025-07-22 14:55:47.606000',0,0),(32,3,'Hồng','256GB',13000000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753170977/apubyf6zxubr42rpzpog.png',7,_binary '\0',14000000,7,'2025-07-22 14:56:38.499000',0,0),(33,3,'Hồng','512GB',15000000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753171006/y4usqasjcakpyccizmub.png',5,_binary '\0',15000000,0,'2025-07-22 14:57:07.619000',0,0),(34,3,'Hồng','1TB',16000000,'https://res.cloudinary.com/dpxhr0akx/image/upload/v1753171042/wadsshrsgjuq42fdfntg.png',1,_binary '\0',16000000,0,'2025-07-22 14:57:41.535000',0,0);
/*!40000 ALTER TABLE `sanpham_variant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `quyentruycap` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'    Yên Quán - Hưng Đạo - Hà Nội','admin@ecommerce.com','DK Care','$2a$10$kusuNun.zddMaKJezOFbPO9RY0SjIwcSEVO8upTWN0kndhx7GnemK','0364695986','admin','admin','male','https://res.cloudinary.com/dpxhr0akx/image/upload/v1753152658/avatars/kk2rfylyymlkfuiodoug.jpg','2025-06-05 10:00:00.000000',_binary ''),(2,'Ngã 3 - Xóm Cống Đá - Hưng Đạo','long1311@gmail.com','Long Bang Chủ','$2a$10$9FHCa8cVSIgLlQU/e3u10.gpWjIyyn/Hd9OWKn.3GJ9Y3WsIwHZpi','0123456789','user','long1311','female','https://res.cloudinary.com/dpxhr0akx/image/upload/v1753153679/avatars/apfroewqllpezfaez4al.jpg','2025-07-12 14:30:00.000000',_binary '');
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

-- Dump completed on 2025-07-25  0:44:56
