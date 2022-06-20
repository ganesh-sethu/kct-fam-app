-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: kct_fam
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

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
-- Table structure for table `academic_year`
--

DROP TABLE IF EXISTS `academic_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_year` (
  `id` int NOT NULL AUTO_INCREMENT,
  `year` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_year`
--

LOCK TABLES `academic_year` WRITE;
/*!40000 ALTER TABLE `academic_year` DISABLE KEYS */;
INSERT INTO `academic_year` VALUES (1,'2021-2022','2022-06-02 16:39:40','2022-06-02 16:46:00');
/*!40000 ALTER TABLE `academic_year` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `departments` VALUES ('ADMIN',0,0,'Administration department','2022-04-04 13:58:52','2022-06-13 12:22:57'),('ARCH_DEPT',0,0,'Archival Department','2022-04-04 13:58:59','2022-04-04 13:58:59'),('BUDGET',0,0,'Budget Department','2022-04-04 13:59:16','2022-04-04 13:59:16'),('CSE',100000,30000,'Computer Science and Engineering','2022-04-04 13:58:38','2022-06-20 14:32:25'),('ECE',100000,0,'Electronics and Communication Engineering','2022-04-11 17:21:48','2022-06-20 14:40:58'),('EEE',100000,0,'Electrical and Electronics Engineering','2022-04-11 17:22:08','2022-06-20 14:41:05'),('HR',0,0,'Human Resource','2022-04-04 13:59:10','2022-04-04 13:59:10'),('IT',100000,0,'Information Technology','2022-04-04 13:58:18','2022-04-04 13:58:18'),('MECH',100000,0,'Mechanical Engineering','2022-04-11 17:22:24','2022-06-20 14:41:13'),('PRINCIPAL',0,0,'Principal','2022-04-04 13:59:05','2022-04-04 13:59:05');
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
  `proof` varchar(255) DEFAULT NULL,
  `academic_year` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `emp_id` (`emp_id`),
  KEY `fk_rejected_by` (`rejected_by`),
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `users` (`emp_id`) ON DELETE CASCADE,
  CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`rejected_by`) REFERENCES `users` (`emp_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


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
INSERT INTO `users` VALUES ('ad01','Mr. Admin User','admin@kct.ac.in','ADMIN','$2b$10$AGfysFdHmnoS1kE3l6kL/uZmVG.zlDBJbh.MKsN/mpHGDzW0GuFUe','ADMIN','2022-04-04 13:59:37','2022-06-20 14:49:26'),('ar01','Mr. Archival user','archival@kct.ac.in','ARCH_DEPT','$2b$10$9J1VtcdNt/FNB4feZgB9B.RlgjwJFQJS8KhROf1gH20O728McE7R6','ARCH_DEPT','2022-04-04 14:02:45','2022-06-20 14:50:00'),('b01','Mr. Budget Co ordinator','budget@kct.ac.in','BUDGET','$2b$10$BPbN6Bg/nkmJE6zhL.eG1uVEDLK5cdNxQBdkVcqcwQXdsYbNJ13Bi','BUDGET','2022-04-04 14:00:37','2022-06-20 14:49:48'),('e01','Mr. Staff1','staff1@kct.ac.in','CSE','$2b$10$4JNTIPtVaAC7veOeklvV2.j/toPzIUbLseO1UAEZspo397nwWVcMO','STAFF','2022-04-04 13:59:50','2022-06-20 14:50:09'),('e02','Mr. HOD CSE ','hod-cse@kct.ac.in','CSE','$2b$10$vq8oJIVquxXo/BPI12C80OGXh0XsJuMiChljBoAwEf.pnwb.USPfi','HOD','2022-04-04 13:59:44','2022-06-20 14:49:08'),('h01','Mr. HR','hr@kct.ac.in','HR','$2b$10$3GpF3jTYVabvS/AzC8EpQuw4BoKkcHoMcFSs5XW5i5FlwrLA7Gip6','HR','2022-04-04 14:02:03','2022-06-20 14:49:17'),('p01','Mr. principal','principal@kct.ac.in','PRINCIPAL','$2b$10$ED5QRRsbZY/aJ6HyjAskn.W6VzacN.IIQw3PmrVINpZTBbwdjPVnO','PRINCIPAL','2022-04-04 14:04:10','2022-06-20 14:50:17');
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

-- Dump completed on 2022-06-20 21:53:31
