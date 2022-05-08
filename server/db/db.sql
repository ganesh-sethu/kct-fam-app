-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: kct_fam
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

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
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `department` varchar(50) NOT NULL,
  `allocated_budget` int DEFAULT NULL,
  `budget_used` int DEFAULT NULL,
  `department_name` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`department`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES ('ADMIN',0,0,'Administration department','2022-04-04 13:58:52','2022-04-04 13:58:52'),('ARCH_DEPT',0,0,'Archival Department','2022-04-04 13:58:59','2022-04-04 13:58:59'),('BUDGET',0,0,'Budget Department','2022-04-04 13:59:16','2022-04-04 13:59:16'),('CSE',100000,0,'Computer Science and Engineering','2022-04-04 13:58:38','2022-04-04 13:58:38'),('ECE',100000,100,'Electronics and Communication Engineering','2022-04-11 17:21:48','2022-04-11 17:21:48'),('EEE',100000,1000,'Electrical and Electronics Engineering','2022-04-11 17:22:08','2022-04-11 17:22:08'),('HR',0,0,'Human Resource','2022-04-04 13:59:10','2022-04-04 13:59:10'),('IT',100000,0,'Information Technology','2022-04-04 13:58:18','2022-04-04 13:58:18'),('MECH',100000,3000,'Mechanical Engineering','2022-04-11 17:22:24','2022-04-11 17:22:24'),('PRINCIPAL',0,0,'Principal','2022-04-04 13:59:05','2022-04-04 13:59:05');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `emp_id` varchar(50) DEFAULT NULL,
  `user_level` int DEFAULT NULL,
  `approval_status` int DEFAULT NULL,
  `event_type` varchar(50) DEFAULT NULL,
  `event_info` json DEFAULT NULL,
  `budget_ref_no` varchar(50) DEFAULT NULL,
  `aad_no` varchar(50) DEFAULT NULL,
  `event_happened` tinyint DEFAULT NULL,
  `rejection_reason` varchar(1000) DEFAULT NULL,
  `rejected_by` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`request_id`),
  KEY `emp_id` (`emp_id`),
  KEY `fk_rejected_by` (`rejected_by`),
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `users` (`emp_id`) ON DELETE CASCADE,
  CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`rejected_by`) REFERENCES `users` (`emp_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (7,'b01',1,6,NULL,'{\"To\": \"2022-04-11\", \"From\": \"2022-04-11\", \"Budget\": \"\", \"Event Type\": \"Organize event\", \"Event Venue\": \"Seminar Hall\", \"Event Details\": \"\", \"Faculty in Charge\": \"Mr X\", \"Title of the Programme\": \"AI workshop\", \"Purpose of the Programme\": \"\"}',NULL,NULL,NULL,NULL,NULL,'2022-04-11 16:09:43','2022-04-11 16:12:09'),(8,'b01',1,6,NULL,'{\"To\": \"2022-04-01\", \"From\": \"2022-04-01\", \"Budget\": \"10000\", \"Event Type\": \"Attend event\", \"Event Venue\": \"Seminar Hall\", \"Event Details\": \"\", \"Faculty in Charge\": \"Mr A\", \"Title of the Programme\": \"AI workshop\", \"Purpose of the Programme\": \"\"}',NULL,NULL,NULL,NULL,NULL,'2022-04-11 16:10:08','2022-04-11 16:12:09'),(9,'b01',1,6,NULL,'{\"To\": \"2022-04-02\", \"From\": \"2022-04-02\", \"Budget\": \"100\", \"Event Type\": \"Attend event\", \"Event Venue\": \"Seminar Hall\", \"Event Details\": \"\", \"Faculty in Charge\": \"Mr B\", \"Title of the Programme\": \"Data science webinar\", \"Purpose of the Programme\": \"\"}',NULL,NULL,NULL,NULL,NULL,'2022-04-11 16:10:33','2022-04-11 16:12:09'),(10,'b01',1,6,NULL,'{\"To\": \"2022-04-06\", \"From\": \"2022-04-05\", \"Budget\": \"1000\", \"Event Type\": \"Organize event\", \"Event Venue\": \"Seminar Hall\", \"Event Details\": \"\", \"Faculty in Charge\": \"Mr Y\", \"Title of the Programme\": \"IOT workshop\", \"Purpose of the Programme\": \"\"}',NULL,NULL,NULL,NULL,NULL,'2022-04-11 16:11:07','2022-04-11 16:15:12');
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `emp_id` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`emp_id`),
  KEY `department` (`department`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`department`) REFERENCES `departments` (`department`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('ad01','Subash','subash@kct.ac.in','ADMIN','$2b$10$AGfysFdHmnoS1kE3l6kL/uZmVG.zlDBJbh.MKsN/mpHGDzW0GuFUe','ADMIN','2022-04-04 13:59:37','2022-04-04 13:59:37'),('ar01','saran','saran@kct.ac.in','ARCH_DEPT','$2b$10$9J1VtcdNt/FNB4feZgB9B.RlgjwJFQJS8KhROf1gH20O728McE7R6','ARCH_DEPT','2022-04-04 14:02:45','2022-04-04 14:02:45'),('b01','Tywin','tywin@kct.ac.in','BUDGET','$2b$10$BPbN6Bg/nkmJE6zhL.eG1uVEDLK5cdNxQBdkVcqcwQXdsYbNJ13Bi','BUDGET','2022-04-04 14:00:37','2022-04-04 14:00:37'),('e01','John','john@kct.ac.in','CSE','$2b$10$uwW4rXeYI2aspEeArn.zbeaMj9Dm95FHUv1.2RJyQqP0vJhPDsGza','Assistant Professor','2022-04-04 13:59:50','2022-04-04 13:59:50'),('e02','Dany','dany@kct.ac.in','CSE','$2b$10$vq8oJIVquxXo/BPI12C80OGXh0XsJuMiChljBoAwEf.pnwb.USPfi','HOD','2022-04-04 13:59:44','2022-04-04 13:59:44'),('h01','ganesh','ganesh@kct.ac.in','HR','$2b$10$3GpF3jTYVabvS/AzC8EpQuw4BoKkcHoMcFSs5XW5i5FlwrLA7Gip6','HR','2022-04-04 14:02:03','2022-04-04 14:02:03'),('p01','George','george@kct.ac.in','PRINCIPAL','$2b$10$ED5QRRsbZY/aJ6HyjAskn.W6VzacN.IIQw3PmrVINpZTBbwdjPVnO','PRINCIPAL','2022-04-04 14:04:10','2022-04-04 14:04:10');
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

-- Dump completed on 2022-05-07 23:51:56
