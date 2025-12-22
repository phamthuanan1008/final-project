-- MySQL dump 10.13  Distrib 9.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: fashion
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authorize`
--

DROP DATABASE IF EXISTS fashion;
CREATE DATABASE fashion
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE fashion;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;



DROP TABLE IF EXISTS `authorize`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authorize` (
  `authorize_id` int NOT NULL AUTO_INCREMENT,
  `authorize_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`authorize_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authorize`
--

LOCK TABLES `authorize` WRITE;
/*!40000 ALTER TABLE `authorize` DISABLE KEYS */;
INSERT INTO `authorize` VALUES (1,'ADMIN'),(2,'USER'),(3,'STAFF');
/*!40000 ALTER TABLE `authorize` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_post`
--

DROP TABLE IF EXISTS `category_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_post` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `FKhpatx1sql74wecl9jax7jfl1` (`user_id`),
  CONSTRAINT `FKhpatx1sql74wecl9jax7jfl1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_post`
--

LOCK TABLES `category_post` WRITE;
/*!40000 ALTER TABLE `category_post` DISABLE KEYS */;
INSERT INTO `category_post` VALUES (1,'Tin tức về sản phẩm mới nhất','2024-04-02',0,6),(2,'Tin tức về những sản phẩm đang nổi bật ở cửa hàng','2024-04-02',1,8),(4,'Danh mục mới','2024-04-01',2,6),(15,'báo mớii','2024-04-10',15,6);
/*!40000 ALTER TABLE `category_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_product`
--

DROP TABLE IF EXISTS `category_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_product` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `FK66igf76f6gp805glhjjhn8nau` (`user_id`),
  CONSTRAINT `FK66igf76f6gp805glhjjhn8nau` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_product`
--

LOCK TABLES `category_product` WRITE;
/*!40000 ALTER TABLE `category_product` DISABLE KEYS */;
INSERT INTO `category_product` VALUES (1,'Áo','2024-04-01',0,6),(2,'Quần','2024-04-03',1,6),(3,'Tất','2024-04-05',2,6),(4,'Váy','2024-04-14',1,6);
/*!40000 ALTER TABLE `category_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8mb4_general_ci,
  `post_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKs1slvnkuemjsq2kj4h3vhx7i1` (`post_id`),
  KEY `FKm1rmnfcvq5mk26li4lit88pc5` (`product_id`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKm1rmnfcvq5mk26li4lit88pc5` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `FKs1slvnkuemjsq2kj4h3vhx7i1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_method`
--

DROP TABLE IF EXISTS `delivery_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_method` (
  `delivery_id` bigint NOT NULL AUTO_INCREMENT,
  `delivery_cost` double DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`delivery_id`),
  KEY `FKdn3a5b2c73prsk8s59l42fj35` (`user_id`),
  CONSTRAINT `FKdn3a5b2c73prsk8s59l42fj35` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_method`
--

LOCK TABLES `delivery_method` WRITE;
/*!40000 ALTER TABLE `delivery_method` DISABLE KEYS */;
INSERT INTO `delivery_method` VALUES (1,15000,'Đảm bảo nhận hàng sau 3-4 ngày','Nhanh',6),(2,33600,'Đảm bảo nhận hàng vào hôm nay','Hoả tốc',6),(3,NULL,NULL,NULL,6);
/*!40000 ALTER TABLE `delivery_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_product`
--

DROP TABLE IF EXISTS `image_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_product` (
  `image_id` bigint NOT NULL AUTO_INCREMENT,
  `image_product` text COLLATE utf8mb4_general_ci,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `FKml4177k7ufupebm7e4wgmvpnj` (`product_id`),
  CONSTRAINT `FKml4177k7ufupebm7e4wgmvpnj` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_product`
--

LOCK TABLES `image_product` WRITE;
/*!40000 ALTER TABLE `image_product` DISABLE KEYS */;
INSERT INTO `image_product` VALUES (13,'product_1718857007476.jpg',7),(14,'product_1718857007511.jpg',7),(15,'product_1718857007519.jpg',7),(16,'product_1718857007526.jpg',7),(17,'product_1718872200951.jpg',8),(18,'product_1718872200988.jpg',8),(19,'product_1718872200993.jpg',8),(20,'product_1718872201000.jpg',8),(21,'product_1718872403279.jpg',9),(22,'product_1718872403296.jpg',9),(23,'product_1718872403305.jpg',9),(24,'product_1718872403314.jpg',9),(25,'product_1718872594891.jpg',10),(26,'product_1718872594902.jpg',10),(27,'product_1718872594911.jpg',10),(28,'product_1718872594919.jpg',10),(29,'product_1718872724657.jpg',11),(30,'product_1718872724667.jpg',11),(31,'product_1718872724675.jpg',11),(32,'product_1718872724683.jpg',11);
/*!40000 ALTER TABLE `image_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `inventory_id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `product_color_id` int DEFAULT NULL,
  `product_size_id` int DEFAULT NULL,
  PRIMARY KEY (`inventory_id`),
  KEY `FKp7gj4l80fx8v0uap3b2crjwp5` (`product_id`),
  KEY `FKnr4f509rcvaophwm70nri5hod` (`product_color_id`),
  KEY `FKb43jxceqgi01p6y6makpao44n` (`product_size_id`),
  CONSTRAINT `FKb43jxceqgi01p6y6makpao44n` FOREIGN KEY (`product_size_id`) REFERENCES `product_size` (`product_size_id`),
  CONSTRAINT `FKnr4f509rcvaophwm70nri5hod` FOREIGN KEY (`product_color_id`) REFERENCES `product_color` (`product_color_id`),
  CONSTRAINT `FKp7gj4l80fx8v0uap3b2crjwp5` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (15,25,7,5,1),(16,37,8,3,1),(17,70,9,8,3),(18,139,10,3,2),(19,34,11,9,3);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `order_detail_id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` bigint DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `product_color_id` int DEFAULT NULL,
  `product_size_id` int DEFAULT NULL,
  PRIMARY KEY (`order_detail_id`),
  KEY `FKrws2q0si6oyd6il8gqe2aennc` (`order_id`),
  KEY `FKb8bg2bkty0oksa3wiq5mp5qnc` (`product_id`),
  KEY `FK7qb83q2nyp6dsoakakusiwnc7` (`product_color_id`),
  KEY `FKbwusgmfhhhgdcmrefkvsxhi47` (`product_size_id`),
  CONSTRAINT `FK7qb83q2nyp6dsoakakusiwnc7` FOREIGN KEY (`product_color_id`) REFERENCES `product_color` (`product_color_id`),
  CONSTRAINT `FKb8bg2bkty0oksa3wiq5mp5qnc` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `FKbwusgmfhhhgdcmrefkvsxhi47` FOREIGN KEY (`product_size_id`) REFERENCES `product_size` (`product_size_id`),
  CONSTRAINT `FKrws2q0si6oyd6il8gqe2aennc` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (14,2,598000,7,7,5,1),(15,3,2997000,8,11,9,3),(16,2,1598000,8,10,3,2),(17,3,2997000,9,11,9,3),(18,2,1598000,9,10,3,2),(19,3,3297000,10,8,3,1),(20,2,2580000,10,9,8,3);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `note` text COLLATE utf8mb4_general_ci,
  `status` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `delivery_method_id` bigint DEFAULT NULL,
  `payment_method_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FKq2m2xkvrir0eftwpixx46v9l5` (`delivery_method_id`),
  KEY `FKgeqwl6x0iadp9e2459uh3o8fv` (`payment_method_id`),
  KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`),
  CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKgeqwl6x0iadp9e2459uh3o8fv` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`payment_id`),
  CONSTRAINT `FKq2m2xkvrir0eftwpixx46v9l5` FOREIGN KEY (`delivery_method_id`) REFERENCES `delivery_method` (`delivery_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (7,'P25 K5 Bách Khoa Hai Bà Trưng Hà Nội','2024-06-20',NULL,'Đang xử lý',1,1,6),(8,'P25 K5 Bách Khoa Hai Bà Trưng Hà Nội','2024-06-20',NULL,'Đơn hàng thành công',1,1,6),(9,'P25 K5 Bách Khoa Hai Bà Trưng Hà Nội','2024-06-20',NULL,'Đơn hàng bị huỷ',1,1,14),(10,'P25 K5 Bách Khoa Hai Bà Trưng Hà Nội','2024-06-20',NULL,'Đang giao hàng',1,1,20);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_method`
--

DROP TABLE IF EXISTS `payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_method` (
  `payment_id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment_cost` double DEFAULT NULL,
  `payment_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `FK9qgi86n91j5kxnymanelaa1ag` (`user_id`),
  CONSTRAINT `FK9qgi86n91j5kxnymanelaa1ag` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_method`
--

LOCK TABLES `payment_method` WRITE;
/*!40000 ALTER TABLE `payment_method` DISABLE KEYS */;
INSERT INTO `payment_method` VALUES (1,'Thanh toán tại nhà',0,'Thanh toán tại nhà',6);
/*!40000 ALTER TABLE `payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` date DEFAULT NULL,
  `post_detail` longtext COLLATE utf8mb4_general_ci,
  `post_image` longtext COLLATE utf8mb4_general_ci,
  `post_title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category_post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `FKnrreogetrk4nditahvc0082yn` (`category_post_id`),
  KEY `FK72mt33dhhs48hf9gcqrq4fxte` (`user_id`),
  CONSTRAINT `FK72mt33dhhs48hf9gcqrq4fxte` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKnrreogetrk4nditahvc0082yn` FOREIGN KEY (`category_post_id`) REFERENCES `category_post` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (6,'2024-03-21','<p>Trong tháng 3 năm 2024, thị trường thời trang đã chứng kiến sự xuất hiện của nhiều xu hướng mới đầy hấp dẫn. Từ những bộ đồ phong cách streetwear đến những bộ trang phục công sở thanh lịch, có một sự đa dạng phong phú cho mọi phong cách và sở thích. Dưới đây là một số item nổi bật bạn không thể bỏ qua trong bộ sưu tập thời trang của mình:</p><ul><li>Áo hoodie oversized: Với sự thoải mái và phong cách riêng biệt, áo hoodie oversized đang trở thành một item hot không thể thiếu trong tủ đồ của mọi người.</li><li>Quần jeans mom fit: Được thiết kế ôm sát ở phần eo và rộng ở phần chân, quần jeans mom fit là lựa chọn lý tưởng cho những ai muốn kết hợp giữa sự thoải mái và phong cách.</li><li>Áo sơ mi trắng cơ bản: Với sự đa dụng và dễ kết hợp, áo sơ mi trắng cơ bản luôn là một item không thể thiếu trong mỗi bộ sưu tập thời trang.</li><li>Váy midi xếp ly: Mang đến vẻ đẹp nữ tính và duyên dáng, váy midi xếp ly là lựa chọn hoàn hảo cho những buổi hẹn hò hay đi chơi cùng bạn bè.</li><li>Áo khoác bomber màu pastel: Với gam màu nhẹ nhàng và dễ phối đồ, áo khoác bomber màu pastel là một item thời trang không thể bỏ qua trong mùa xuân này.</li></ul><p>Đừng bỏ lỡ cơ hội cập nhật tủ đồ của bạn với những item thời trang mới nhất trong tháng 3 này!</p>','post_1710996431848.jpg','Top những quần áo mới nhất tháng 3/2024(update lần 2)',1,6),(11,'2024-05-04','<p>Trong tháng 3 năm 2024, thị trường thời trang đã chứng kiến sự xuất hiện của nhiều xu hướng mới đầy hấp dẫn. Từ những bộ đồ phong cách streetwear đến những bộ trang phục công sở thanh lịch, có một sự đa dạng phong phú cho mọi phong cách và sở thích. Dưới đây là một số item nổi bật bạn không thể bỏ qua trong bộ sưu tập thời trang của mình:</p><ul><li>Áo hoodie oversized: Với sự thoải mái và phong cách riêng biệt, áo hoodie oversized đang trở thành một item hot không thể thiếu trong tủ đồ của mọi người.</li><li>Quần jeans mom fit: Được thiết kế ôm sát ở phần eo và rộng ở phần chân, quần jeans mom fit là lựa chọn lý tưởng cho những ai muốn kết hợp giữa sự thoải mái và phong cách.</li><li>Áo sơ mi trắng cơ bản: Với sự đa dụng và dễ kết hợp, áo sơ mi trắng cơ bản luôn là một item không thể thiếu trong mỗi bộ sưu tập thời trang.</li><li>Váy midi xếp ly: Mang đến vẻ đẹp nữ tính và duyên dáng, váy midi xếp ly là lựa chọn hoàn hảo cho những buổi hẹn hò hay đi chơi cùng bạn bè.</li><li>Áo khoác bomber màu pastel: Với gam màu nhẹ nhàng và dễ phối đồ, áo khoác bomber màu pastel là một item thời trang không thể bỏ qua trong mùa xuân này.</li></ul><p>Đừng bỏ lỡ cơ hội cập nhật tủ đồ của bạn với những item thời trang mới nhất trong tháng 3 này!</p>','post_1710996431848.jpg','Top những quần áo mới nhất tháng 3/2024',1,6),(13,'2024-05-08','<p>dsaaaaaaaaaaaaaaaaaaaaaaaaaadasdasdsadsaaaaaaaaaaaaaaaaaaaaaaaaaadasdasdsadsaaaaaaaaaaaaaaaaaaaaaaaaaadasdasdsadsaaaaaaaaaaaaaaaaaaaaaaaaaadasdasdsadsaaaaaaaaaaaaaaaaaaaaaaaaaadasdasdsa</p>','post_1715180351422.jpg','Những sản phẩm mới nhất tháng 8/2024',1,6),(14,'2024-05-09','<a>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</a>','post_1715225424084.jpg','Báo mới',15,6),(15,'2024-05-09','<p>Trong tháng 3 năm 2024, thị trường thời trang đã chứng kiến sự xuất hiện của nhiều xu hướng mới đầy hấp dẫn. Từ những bộ đồ phong cách streetwear đến những bộ trang phục công sở thanh lịch, có một sự đa dạng phong phú cho mọi phong cách và sở thích. Dưới đây là một số item nổi bật bạn không thể bỏ qua trong bộ sưu tập thời trang của mình:</p><ul><li>Áo hoodie oversized: Với sự thoải mái và phong cách riêng biệt, áo hoodie oversized đang trở thành một item hot không thể thiếu trong tủ đồ của mọi người.</li><li>Quần jeans mom fit: Được thiết kế ôm sát ở phần eo và rộng ở phần chân, quần jeans mom fit là lựa chọn lý tưởng cho những ai muốn kết hợp giữa sự thoải mái và phong cách.</li><li>Áo sơ mi trắng cơ bản: Với sự đa dụng và dễ kết hợp, áo sơ mi trắng cơ bản luôn là một item không thể thiếu trong mỗi bộ sưu tập thời trang.</li><li>Váy midi xếp ly: Mang đến vẻ đẹp nữ tính và duyên dáng, váy midi xếp ly là lựa chọn hoàn hảo cho những buổi hẹn hò hay đi chơi cùng bạn bè.</li><li>Áo khoác bomber màu pastel: Với gam màu nhẹ nhàng và dễ phối đồ, áo khoác bomber màu pastel là một item thời trang không thể bỏ qua trong mùa xuân này.</li></ul><p>Đừng bỏ lỡ cơ hội cập nhật tủ đồ của bạn với những item thời trang mới nhất trong tháng 3 này!</p>','post_1715229467471.jpg','Top những quần áo mới nhất tháng 3/2024',1,6),(16,'2024-05-09','<p>Trong tháng 3 năm 2024, thị trường thời trang đã chứng kiến sự xuất hiện của nhiều xu hướng mới đầy hấp dẫn. Từ những bộ đồ phong cách streetwear đến những bộ trang phục công sở thanh lịch, có một sự đa dạng phong phú cho mọi phong cách và sở thích. Dưới đây là một số item nổi bật bạn không thể bỏ qua trong bộ sưu tập thời trang của mình:</p><ul><li>Áo hoodie oversized: Với sự thoải mái và phong cách riêng biệt, áo hoodie oversized đang trở thành một item hot không thể thiếu trong tủ đồ của mọi người.</li><li>Quần jeans mom fit: Được thiết kế ôm sát ở phần eo và rộng ở phần chân, quần jeans mom fit là lựa chọn lý tưởng cho những ai muốn kết hợp giữa sự thoải mái và phong cách.</li><li>Áo sơ mi trắng cơ bản: Với sự đa dụng và dễ kết hợp, áo sơ mi trắng cơ bản luôn là một item không thể thiếu trong mỗi bộ sưu tập thời trang.</li><li>Váy midi xếp ly: Mang đến vẻ đẹp nữ tính và duyên dáng, váy midi xếp ly là lựa chọn hoàn hảo cho những buổi hẹn hò hay đi chơi cùng bạn bè.</li><li>Áo khoác bomber màu pastel: Với gam màu nhẹ nhàng và dễ phối đồ, áo khoác bomber màu pastel là một item thời trang không thể bỏ qua trong mùa xuân này.</li></ul><p>Đừng bỏ lỡ cơ hội cập nhật tủ đồ của bạn với những item thời trang mới nhất trong tháng 3 này!</p>','post_1715229488089.jpg','Top những quần áo mới nhất tháng 3/2024',15,6);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` date DEFAULT NULL,
  `listed_price` double DEFAULT NULL,
  `outstanding` bit(1) DEFAULT NULL,
  `product_code` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_description` longtext COLLATE utf8mb4_general_ci,
  `product_detail` text COLLATE utf8mb4_general_ci,
  `product_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_price` double DEFAULT NULL,
  `category_product_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FKippb821nwiaprbcw1bb77fhm0` (`category_product_id`),
  KEY `FK979liw4xk18ncpl87u4tygx2u` (`user_id`),
  CONSTRAINT `FK979liw4xk18ncpl87u4tygx2u` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKippb821nwiaprbcw1bb77fhm0` FOREIGN KEY (`category_product_id`) REFERENCES `category_product` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (7,'2024-06-20',310000,_binary '','#SP21973','CHẤT LIỆU, CÁCH CHĂM SÓC & NGUỒN GỐC\nCHẤT LIỆU\nChúng tôi đang triển khai các chương trình giám sát nhằm đảm bảo sự tuân thủ các tiêu chuẩn của chúng tôi về xã hội, môi trường, cũng như về độ an toàn và tính lành mạnh của các sản phẩm. Nhằm đánh giá sự tuân thủ các tiêu chuẩn này, chúng tôi đã phát triển một chương trình kiểm toán và các kế hoạch cải thiện liên tục.\nLỚP NGOÀI\n100% vải cotton\nCHĂM SÓC\nChăm sóc đúng cách quần áo của mình tức là bạn đang bảo vệ môi trường\nGiặt ở nhiệt độ thấp và sử dụng các chế độ vắt nhẹ nhàng sẽ có lợi hơn cho quần áo, giúp duy trì màu sắc, hình dạng và cấu trúc của vải. Đồng thời giúp làm giảm lượng năng lượng tiêu thụ trong các quá trình chăm sóc. \n\nHướng dẫn bảo quản quần áo\nGiặt máy ở nhiệt độ tối đa 30ºC, vắt ở tốc độ thấp\nKhông sử dụng nước tẩy / thuốc tẩy\nGiặt ở nhiệt độ tối đa 110ºC \nKhông giặt khô\nKhông sử dụng máy sấy\nNGUỒN GỐC\nChúng tôi phối hợp với các nhà cung cấp, người lao động, công đoàn và các tổ chức quốc tế nhằm phát triển một chuỗi cung ứng mà trong đó quyền con người được tôn trọng và thúc đẩy, góp phần thực hiện các Mục tiêu Phát triển Bền vững của Liên Hợp Quốc. \nBằng việc hợp tác với các nhà cung cấp, chúng tôi nỗ lực tìm hiểu các cơ sở và quy trình mà họ sử dụng để sản xuất các sản phẩm may mặc của chúng tôi với mục đích truy xuất nguồn gốc của các sản phẩm.','MID WEIGHT - REGULAR FIT- CỔ TRÒN - CHIỀU DÀI THÔNG THƯỜNG - CỘC TAY\n\nÁo phông 100% vải cotton, cổ tròn, cộc tay.','ÁO PHÔNG COTTON CƠ BẢN',299000,1,6),(8,'2024-06-20',1190000,_binary '','#SP2812315','CHẤT LIỆU, CÁCH CHĂM SÓC & NGUỒN GỐC\nCHẤT LIỆU\nChúng tôi đang triển khai các chương trình giám sát nhằm đảm bảo sự tuân thủ các tiêu chuẩn của chúng tôi về xã hội, môi trường, cũng như về độ an toàn và tính lành mạnh của các sản phẩm. Nhằm đánh giá sự tuân thủ các tiêu chuẩn này, chúng tôi đã phát triển một chương trình kiểm toán và các kế hoạch cải thiện liên tục.\nLỚP NGOÀI\n89% mốt\n11% vải pôliexte\nCHĂM SÓC\nChăm sóc đúng cách quần áo của mình tức là bạn đang bảo vệ môi trường\nGiặt ở nhiệt độ thấp và sử dụng các chế độ vắt nhẹ nhàng sẽ có lợi hơn cho quần áo, giúp duy trì màu sắc, hình dạng và cấu trúc của vải. Đồng thời giúp làm giảm lượng năng lượng tiêu thụ trong các quá trình chăm sóc. ','Quần cạp cao may con đỉa. Có túi hai bên và túi may viền phía sau. Có các chi tiết xếp li. Cài khuy và khóa kéo phía trước.','QUẦN VẢI RŨ XẾP LI',1099000,2,6),(9,'2024-06-20',1390000,_binary '\0','#SP2412213','CHẤT LIỆU, CÁCH CHĂM SÓC & NGUỒN GỐC\nCHẤT LIỆU\nChúng tôi đang triển khai các chương trình giám sát nhằm đảm bảo sự tuân thủ các tiêu chuẩn của chúng tôi về xã hội, môi trường, cũng như về độ an toàn và tính lành mạnh của các sản phẩm. Nhằm đánh giá sự tuân thủ các tiêu chuẩn này, chúng tôi đã phát triển một chương trình kiểm toán và các kế hoạch cải thiện liên tục.\nLỚP NGOÀI\n98% vải cotton\n2% elastane\nCHĂM SÓC\nChăm sóc đúng cách quần áo của mình tức là bạn đang bảo vệ môi trường\nĐể kéo dài tuổi thọ cho quần áo denim của bạn, hãy luôn lộn trái chúng từ trong ra ngoài và giặt chúng ở nhiệt độ thấp. Cách làm như vậy giúp bảo quản màu sắc và cấu trúc vải, đồng thời giúp làm giảm lượng năng lượng tiêu thụ. ','CẠP CAO - ỐNG SUÔNG - DÀI ĐẾN MẮT CÁ CHÂN - THIẾT KẾ THOẢI MÁI\nQuần jeans ống dài đến mắt cá chân, cạp cao, có 5 túi. Kiểu bạc màu. Ống suông, ngắn. Cài phía trước bằng khóa kéo và khuy kim loại.','JEANS Z1975 STRAIGHT ANKLE COMFORT CẠP CAO',1290000,2,6),(10,'2024-06-20',850000,_binary '','#SP27361','CHẤT LIỆU, CÁCH CHĂM SÓC & NGUỒN GỐC\nCHẤT LIỆU\nChúng tôi đang triển khai các chương trình giám sát nhằm đảm bảo sự tuân thủ các tiêu chuẩn của chúng tôi về xã hội, môi trường, cũng như về độ an toàn và tính lành mạnh của các sản phẩm. Nhằm đánh giá sự tuân thủ các tiêu chuẩn này, chúng tôi đã phát triển một chương trình kiểm toán và các kế hoạch cải thiện liên tục.\nLỚP NGOÀI\n83% mốt\n17% vải pôliexte\nLỚP LÓT\n83% mốt\n17% vải pôliexte\nCHĂM SÓC\nChăm sóc đúng cách quần áo của mình tức là bạn đang bảo vệ môi trường\nGiặt ở nhiệt độ thấp và sử dụng các chế độ vắt nhẹ nhàng sẽ có lợi hơn cho quần áo, giúp duy trì màu sắc, hình dạng và cấu trúc của vải. Đồng thời giúp làm giảm lượng năng lượng tiêu thụ trong các quá trình chăm sóc. ','Quần giả chân váy cạp lỡ. Có các chi tiết xếp li. Cài khóa kéo ẩn ở đường may bên hông. Lớp vải lót bên trong kiểu quần short.','QUẦN VÁY VẢI RŨ',799000,4,6),(11,'2024-06-20',1090000,_binary '','#SP219732','CHẤT LIỆU, CÁCH CHĂM SÓC & NGUỒN GỐC\nCHẤT LIỆU\nChúng tôi đang triển khai các chương trình giám sát nhằm đảm bảo sự tuân thủ các tiêu chuẩn của chúng tôi về xã hội, môi trường, cũng như về độ an toàn và tính lành mạnh của các sản phẩm. Nhằm đánh giá sự tuân thủ các tiêu chuẩn này, chúng tôi đã phát triển một chương trình kiểm toán và các kế hoạch cải thiện liên tục.\nLỚP NGOÀI\n60% vải cotton\n40% sợi lyocell\nCHĂM SÓC\nChăm sóc đúng cách quần áo của mình tức là bạn đang bảo vệ môi trường\nChỉ giặt quần áo khi cần thiết, đôi khi chỉ cần phơi quần áo tại nơi thoáng khí là đủ. Quá trình giặt làm hao mòn dần các loại vải. Bằng cách giảm số lần giặt, chúng ta sẽ kéo dài tuổi thọ của quần áo và giảm lượng nước và năng lượng tiêu thụ trong các quá trình chăm sóc. ','CẠP LỠ - DÁNG REGULAR\n\nQuần short bermuda cạp lỡ may con đỉa, có 5 túi. Cài bằng khóa kéo và khuy kim loại.','QUẦN SHORT BERMUDA DENIM TRF CẠP LỠ',999000,2,6);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_color`
--

DROP TABLE IF EXISTS `product_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_color` (
  `product_color_id` int NOT NULL AUTO_INCREMENT,
  `color_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`product_color_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_color`
--

LOCK TABLES `product_color` WRITE;
/*!40000 ALTER TABLE `product_color` DISABLE KEYS */;
INSERT INTO `product_color` VALUES (1,'Kem'),(2,'Xám khói'),(3,'Nâu'),(4,'Xám chì'),(5,'Xám rêu'),(6,'Hồng ruốc'),(7,'Hồng pastel'),(8,'Đen trắng'),(9,'Xanh lam'),(10,'Xanh nin'),(11,'Xanh biển');
/*!40000 ALTER TABLE `product_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_size`
--

DROP TABLE IF EXISTS `product_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_size` (
  `product_size_id` int NOT NULL AUTO_INCREMENT,
  `size_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`product_size_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_size`
--

LOCK TABLES `product_size` WRITE;
/*!40000 ALTER TABLE `product_size` DISABLE KEYS */;
INSERT INTO `product_size` VALUES (1,'S'),(2,'M'),(3,'L'),(4,'XL'),(5,'XXL');
/*!40000 ALTER TABLE `product_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `age` int DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `first_name` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `last_name` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone_number` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `sex` char(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `token_active` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_image` longtext COLLATE utf8mb4_general_ci,
  `username` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'Hai Bà Trưng, Hà Nội',21,'phamthuanan03@gmail.com','An',_binary '','Phạm Thuan','$2a$12$mFtKDqgASSJ7lmtyrm5i4ORqay1hLJvFgvRmQgI870f6UoNhr8oam','0838129818','M','de66561a-2576-440f-90ab-8a734d6df9c6a','ava.jpg','Admin12345678'),(8,'Hai Bà Trưng, Hà Nội',21,'huypham3062k322@gmail.com','Huy',_binary '','Phạm Thành','$2a$10$ksgzPTDEE.i1a6J3hZs6LuNUkcE.zH8sF/ezQhUYlnId9MimF2fmK','0838931588','M','215777cf-e582-4dc2-9b8a-8d92dc1a3688','user_1710298486565.jpg','usertestabcd'),(14,'P25 K5 Bách Khoa Hai Bà Trưng Hà Nội',21,'hungtuan13111@gmail.com','Chiến',_binary '','Hùng','$2a$10$PQWGsvadCxaHpnVO4ompee00KYkzkK.N7lr88VJjc1FD5hz6ffhnq','0833876688','M','5215b83c-4258-413f-a760-9c5b4fa66897','user_1715398398576.jpg','thanhhuypham3062k33'),(15,'P25 K5 Bách Khoa Hai Bà Trưng Hà Nội',34,'nguyenvanhanhocmeo@gmail.com',' Văn Hạnh',_binary '','Nguyễn','$2a$10$o/5oqrh.vRUJxPM2vy3q3.fDDQ82l7yp1QeCGha8shNiuc4GAQnOW','0838567123','M','a2525b22-ef92-4c73-924f-696622d72fc7','user_1715593861892.jpg','nguyenvanhanh'),(16,'P25 K5 Bách Khoa Hai Bà Trưng Hà Nội',21,'laiduocnghssitet@gmail.com','Kiều Anh',_binary '','Nguyễn ','$2a$10$2wMRGlvzbEca6rCVUQw4V.ha9WhutdRhOH9qcTw.a/SZF/FyafcYW','0838561432','M','08466051-e760-4f0d-a0cc-c217d88ec0aa','user_1715595832668.jpg','avasdasd'),(17,'P25 K5 Bách Khoa Hai Bà Trưng Hà Nội',21,'laiduocnghitet12312@gmail.com','Dũng',_binary '','Nguyễn Tuấn','$2a$12$zEsBX6BO8t9m27iAY2LpUeW2ZYwr98xQOpAVVfv51uhbuPm8zEhzK','0838936543','M','2a249933-7579-413c-817f-96b931ce9401','user_1715596117134.jpg','Aidjsaidojasidjoas'),(19,'Đông Trù Đông Hội Đông Anh Hà Nội',21,'adasdadads@gmail.com','Huy',_binary '','Phạm','$2a$10$MQL3MdfuYzFsTRIBhApi/ODb0372Hrsr6v/qpyTMk5MHG2N3kvZ8i','0838976531','F','9808f683-1f52-4d4c-b6aa-012f8c56b841','user_1715596280080.jpg','Kiều Chi'),(20,'Hai Bà Trưng, Hà Nội',24,'huyapham3062k3@gmail.com','UserTest',_binary '','user','$2a$10$mo81qQL6N7YUBncgHNugh.alZFCZKFdHq1H361tLJjbEPn2OhtlB6','0838129818','F','49bb63f4-85ef-4b2f-9fd3-5df28e76d25d','user_1715998916352.jpg','Phamthâanhhuy3062k3'),(24,'Hai Bà Trưng, Hà Nội',24,'huyapham30623k3@gmail.com','hehe',_binary '','User Dep trai','$2a$10$eO0nWOmw026IOgM7j0v/Ue5zkiazhgvaZjCnXV43DTLbxvwaEkbt2','0838129818','F','1ed41f24-0780-4266-ae6a-0e31d02aa0ce','user_1717146806180.jpg','Phamthâanhhuy30622k3');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_authorize`
--

DROP TABLE IF EXISTS `user_authorize`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_authorize` (
  `user_id` bigint NOT NULL,
  `authorize_id` int NOT NULL,
  KEY `FKe5qgog5q07kgn9lhocly05nri` (`authorize_id`),
  KEY `FK14kv1ludyi31l1rpcthtt048n` (`user_id`),
  CONSTRAINT `FK14kv1ludyi31l1rpcthtt048n` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKe5qgog5q07kgn9lhocly05nri` FOREIGN KEY (`authorize_id`) REFERENCES `authorize` (`authorize_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_authorize`
--

LOCK TABLES `user_authorize` WRITE;
/*!40000 ALTER TABLE `user_authorize` DISABLE KEYS */;
INSERT INTO `user_authorize` VALUES (6,1),(8,2),(14,2),(19,2),(24,2),(20,2),(17,3),(16,3),(15,3);
/*!40000 ALTER TABLE `user_authorize` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-11 10:07:40
