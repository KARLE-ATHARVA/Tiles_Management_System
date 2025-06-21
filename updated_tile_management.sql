-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tile_management
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--
-- ORDER BY:  `MigrationId`

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES ('20250619164608_InitialCreate','8.0.13'),('20250620164943_AddSqCodeToProduct','8.0.13');

--
-- Table structure for table `activitylogs`
--

DROP TABLE IF EXISTS `activitylogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activitylogs` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Action` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PerformedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Timestamp` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activitylogs`
--
-- ORDER BY:  `Id`

INSERT INTO `activitylogs` (`Id`, `Action`, `PerformedBy`, `Timestamp`) VALUES (24,'Logged in as Admin','Atharva','2025-06-20 15:00:00.688477'),(25,'Logged in as Admin','Atharva','2025-06-20 15:00:00.696395'),(26,'Logged in as Admin','Atharva','2025-06-20 15:11:58.646545'),(27,'Logged in as Admin','Atharva','2025-06-20 16:13:50.801494'),(28,'Logged in as Admin','Soham','2025-06-20 16:29:27.091406'),(29,'Created application: Floor Tiles','Soham','2025-06-20 16:33:07.488041'),(30,'Created application: Floor Tiles','Soham','2025-06-20 16:36:26.015284'),(31,'Created application: Wall Tiles','Soham','2025-06-20 16:36:46.492336'),(32,'Created category: Classic Marble','Soham','2025-06-20 16:38:20.938752'),(33,'Created category: Classic Marble','Soham','2025-06-20 16:39:06.437785'),(34,'Created category: Rustic Wood Finish','Soham','2025-06-20 16:39:25.073576'),(35,'Created category: Glossy Ceramic','Soham','2025-06-20 16:39:32.348988'),(36,'Created category: Matte Stone Finish','Soham','2025-06-20 16:39:39.396474'),(37,'Logged in as Admin','Atharva','2025-06-20 16:42:56.897661'),(38,'Logged in as Admin','Atharva','2025-06-20 18:26:23.579309'),(39,'Logged in as Admin','Atharva','2025-06-20 19:30:53.538476'),(40,'Created product: Marble Glow (SqCode: MG101)','Atharva','2025-06-20 19:31:17.844624'),(41,'Created product: Marble Glow (SqCode: MG101)','Atharva','2025-06-20 19:31:42.491089'),(42,'Created product: Classic Oak (SqCode: CO102)','Atharva','2025-06-20 19:32:05.405636'),(43,'Created product: Urban Grey (SqCode: UG301)','Atharva','2025-06-20 19:32:12.215641'),(44,'Created product: Royal Matte (SqCode: RM201)','Atharva','2025-06-20 19:32:44.787649'),(45,'Created product: Stone Textura (SqCode: ST202)','Atharva','2025-06-20 19:32:55.370897'),(46,'Created product: Sunset Glow (SqCode: SG302)','Atharva','2025-06-20 19:33:06.227174'),(47,'Created product: Mist Blue (SqCode: MB401)','Atharva','2025-06-20 19:33:11.483868'),(48,'Created product: Terra Cotta Charm (SqCode: TC402)','Atharva','2025-06-20 19:33:19.978712'),(49,'Logged in as Admin','Atharva','2025-06-20 19:40:17.064643'),(50,'Uploaded image for product: Marble Glow','Atharva','2025-06-20 19:41:39.158511'),(51,'Uploaded image for product: Classic Oak','Atharva','2025-06-20 19:42:17.573308'),(52,'Uploaded image for product: Urban Grey','Atharva','2025-06-20 19:42:56.494184'),(53,'Uploaded image for product: Royal Matte','Atharva','2025-06-20 19:43:20.722642'),(54,'Uploaded image for product: Stone Textura','Atharva','2025-06-20 19:43:42.134141'),(55,'Uploaded image for product: Sunset Glow','Atharva','2025-06-20 19:44:00.194995'),(56,'Uploaded image for product: Mist Blue','Atharva','2025-06-20 19:44:22.365923'),(57,'Uploaded image for product: Terra Cotta Charm','Atharva','2025-06-20 19:44:39.898018'),(58,'Blocked category: Rustic Wood Finish','Atharva','2025-06-20 19:45:04.053261'),(59,'Unblocked category: Rustic Wood Finish','Atharva','2025-06-20 19:45:08.188703'),(60,'Blocked application: Wall Tiles','Atharva','2025-06-20 19:45:28.743054'),(61,'Logged in as Client','Raj','2025-06-20 19:45:41.147235'),(62,'Logged in as Admin','Atharva','2025-06-20 19:45:55.779445'),(63,'Unblocked application: Wall Tiles','Atharva','2025-06-20 19:45:58.537921'),(64,'Logged in as Client','Raj','2025-06-20 19:46:46.148907'),(65,'Logged in as Admin','Atharva','2025-06-20 19:56:34.040260'),(66,'Logged in as Client','Raj','2025-06-20 20:02:35.807789'),(67,'Logged in as Client','Raj','2025-06-20 20:25:20.550812'),(68,'Logged in as Client','Raj','2025-06-20 20:33:04.529768'),(69,'Logged in as Client','Raj','2025-06-20 20:44:20.574423'),(70,'Logged in as Client','Raj','2025-06-20 20:45:49.938443'),(71,'Logged in as Client','Raj','2025-06-20 20:50:38.342821'),(72,'Logged in as Client','Raj','2025-06-21 07:59:19.561532'),(73,'Logged in as Client','Raj','2025-06-21 08:22:39.637619'),(74,'Logged in as Client','Raj','2025-06-21 09:21:51.480386'),(75,'Logged in as Admin','Atharva','2025-06-21 09:27:31.812530'),(76,'Logged in as Admin','Atharva','2025-06-21 09:44:57.189894'),(77,'Created product: Marble Gloss White (SqCode: TC402)','Atharva','2025-06-21 09:48:59.950584'),(78,'Uploaded image for product: Marble Gloss White','Atharva','2025-06-21 09:54:31.971100'),(79,'Created product: Wooden Floor Matte (SqCode: WFM205)','Atharva','2025-06-21 09:57:49.676380'),(80,'Created product: Wooden Floor Matte (SqCode: WFM205)','Atharva','2025-06-21 10:01:14.218926'),(81,'Uploaded image for product: Wooden Floor Matte','Atharva','2025-06-21 10:04:14.264635'),(82,'Created product: atharva (SqCode: AK2717)','Atharva','2025-06-21 10:05:37.754909'),(83,'Created product: aDDWA (SqCode: ASFSF)','Atharva','2025-06-21 10:08:04.745702'),(84,'Logged in as Admin','Atharva','2025-06-21 10:09:11.829206'),(85,'Created product: afasf (SqCode: 53TR)','Atharva','2025-06-21 10:09:31.524051'),(86,'Created product: afasf (SqCode: 53TR)','Atharva','2025-06-21 10:11:35.614235'),(87,'Created product: qwfqwdqw (SqCode: dqwdqwdfqwd)','Atharva','2025-06-21 10:12:06.731458'),(88,'Created product: safa (SqCode: faafafa)','Atharva','2025-06-21 10:12:21.880451'),(89,'Created product: safa (SqCode: faafafa)','Atharva','2025-06-21 10:15:31.140778'),(90,'Uploaded image for product: safa','Atharva','2025-06-21 10:15:31.683809'),(91,'Created product: efefqe (SqCode: efqf)','Atharva','2025-06-21 10:15:57.997294'),(92,'Uploaded image for product: efefqe','Atharva','2025-06-21 10:15:58.923131'),(93,'Logged in as Client','Raj','2025-06-21 10:28:21.602381'),(94,'Logged in as Client','Raj','2025-06-21 10:32:14.933178'),(95,'Logged in as Client','Raj','2025-06-21 10:32:42.116231'),(96,'Logged in as Admin','Atharva','2025-06-21 10:36:21.327227'),(97,'Created application: Kitchen Tiles','Atharva','2025-06-21 10:36:40.568262'),(98,'Created category: Matte','Atharva','2025-06-21 10:36:48.754849'),(99,'Created product: fdwqfqf (SqCode: fqwqw)','Atharva','2025-06-21 10:37:05.168542'),(100,'Uploaded image for product: fdwqfqf','Atharva','2025-06-21 10:37:05.360501'),(101,'Logged in as Client','Raj','2025-06-21 10:38:33.826691'),(102,'Logged in as Admin','Atharva','2025-06-21 10:38:51.017498');

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `IsBlocked` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--
-- ORDER BY:  `Id`

INSERT INTO `applications` (`Id`, `Name`, `IsBlocked`) VALUES (1,'Floor Tiles',0),(2,'Wall Tiles',0),(3,'Kitchen Tiles',0);

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `IsBlocked` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--
-- ORDER BY:  `Id`

INSERT INTO `categories` (`Id`, `Name`, `IsBlocked`) VALUES (1,'Classic Marble',0),(2,'Rustic Wood Finish',0),(3,'Glossy Ceramic',0),(4,'Matte Stone Finish',0),(5,'Matte',0);

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Price` decimal(65,30) NOT NULL,
  `CategoryId` int NOT NULL,
  `ApplicationId` int NOT NULL,
  `IsBlocked` tinyint(1) NOT NULL,
  `ImagePath` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `SqCode` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Products_ApplicationId` (`ApplicationId`),
  KEY `IX_Products_CategoryId` (`CategoryId`),
  CONSTRAINT `FK_Products_Applications_ApplicationId` FOREIGN KEY (`ApplicationId`) REFERENCES `applications` (`Id`) ON DELETE RESTRICT,
  CONSTRAINT `FK_Products_Categories_CategoryId` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`Id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--
-- ORDER BY:  `Id`

INSERT INTO `products` (`Id`, `Name`, `Description`, `Price`, `CategoryId`, `ApplicationId`, `IsBlocked`, `ImagePath`, `SqCode`) VALUES (1,'Marble Glow','Polished marble tile for luxurious floors',1499.000000000000000000000000000000,1,1,0,'/uploads/145a4327-51ab-40f2-ae3b-12db6bf6d766.jpg','MG101'),(2,'Classic Oak','Wood-look floor tile in warm oak finish',999.000000000000000000000000000000,1,1,0,'/uploads/cd08659f-869c-4283-a737-5caa8e13e33d.jpg','CO102'),(3,'Urban Grey','Sleek grey tile for urban floor spaces',1199.000000000000000000000000000000,3,1,0,'/uploads/de0bb6c4-ebed-4d14-b688-1f0264c0f031.jpg','UG301'),(4,'Royal Matte','Matte finish tiles for contemporary walls',849.500000000000000000000000000000,2,2,0,'/uploads/fe4084f6-d3b2-474b-aa9d-83f6520d5a91.jpg','RM201'),(5,'Stone Textura','Textured wall tile with stone-like appearance',999.990000000000000000000000000000,2,2,0,'/uploads/f012c857-0551-4764-8262-3a91e7e4cb6c.jpg','ST202'),(6,'Sunset Glow','Warm tone tile inspired by sunset hues',1099.500000000000000000000000000000,3,1,0,'/uploads/7ae4b544-5b06-4c1c-9408-5c9dfb6d0aa8.jpg','SG302'),(7,'Mist Blue','Cool blue tiles for refreshing wall designs',899.000000000000000000000000000000,4,2,0,'/uploads/75aa3cc8-406e-402a-937d-7d955edfeb04.jpg','MB401'),(8,'Terra Cotta Charm','Rustic terra cotta tile for artistic walls',999.000000000000000000000000000000,4,2,0,'/uploads/110fcbf2-9990-44dc-aed8-26521436c591.jpg','TC402'),(9,'Marble Gloss White','Rustic terra cotta tile for artistic walls',999.000000000000000000000000000000,4,2,0,'/uploads/b65fca1e-629a-47b2-8bc9-e11dff47c6b6.jpg','TC402');

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Username` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PasswordHash` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Role` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--
-- ORDER BY:  `Id`

INSERT INTO `users` (`Id`, `Username`, `PasswordHash`, `Role`) VALUES (1,'Atharva','$2a$11$3Iu4SkURxy/cyt8/HL17E.JxtjUUSr0d.ZFaITdchTZjcTcjNXqDq','Admin'),(2,'Soham','$2a$11$VDMAg4/VS9XpmH7jAhZ50uZc319hggwcyTv1K.IhWAiEjiOxCmn9y','Admin'),(3,'Raj','$2a$11$hQCX1dnp4MmFh5F/qw2jMeeL4BJi0YskViLYdKCeSt/LbD1K8ra3O','Client'),(4,'Anish','$2a$11$7kjzRhIA1fYXOTqJE8qBvube1dO7qyYU/HEkpwOqwfVHcs3xgOV7.','Client'),(5,'Om','$2a$11$uuAjF1tam1GdCOuEoKoc1uyYahy4Dl8qBRkGJrLUo0Xqb1PBRkoPe','Client');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-21 22:39:38
