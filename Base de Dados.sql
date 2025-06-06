CREATE DATABASE  IF NOT EXISTS `micro_credito` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `micro_credito`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: micro_credito
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `apadrinhamento`
--

DROP TABLE IF EXISTS `apadrinhamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apadrinhamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedido_emprestimo_id` int DEFAULT NULL,
  `verificador_id` int DEFAULT NULL,
  `estado` enum('Apadrinhado','Recusado') NOT NULL,
  `data_apadrinhamento` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `pedido_emprestimo_id` (`pedido_emprestimo_id`),
  KEY `verificador_id` (`verificador_id`),
  CONSTRAINT `apadrinhamento_ibfk_1` FOREIGN KEY (`pedido_emprestimo_id`) REFERENCES `pedidoemprestimo` (`id`),
  CONSTRAINT `apadrinhamento_ibfk_2` FOREIGN KEY (`verificador_id`) REFERENCES `utilizador` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apadrinhamento`
--

LOCK TABLES `apadrinhamento` WRITE;
/*!40000 ALTER TABLE `apadrinhamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `apadrinhamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposito`
--

DROP TABLE IF EXISTS `deposito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deposito` (
  `id` int NOT NULL AUTO_INCREMENT,
  `membro_id` int DEFAULT NULL,
  `grupo_id` int DEFAULT NULL,
  `valor` decimal(14,2) NOT NULL,
  `data_deposito` date NOT NULL,
  `referencia_pagamento` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `membro_id` (`membro_id`),
  KEY `grupo_id` (`grupo_id`),
  CONSTRAINT `deposito_ibfk_1` FOREIGN KEY (`membro_id`) REFERENCES `utilizador` (`id`),
  CONSTRAINT `deposito_ibfk_2` FOREIGN KEY (`grupo_id`) REFERENCES `grupopoupanca` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposito`
--

LOCK TABLES `deposito` WRITE;
/*!40000 ALTER TABLE `deposito` DISABLE KEYS */;
/*!40000 ALTER TABLE `deposito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emprestimo`
--

DROP TABLE IF EXISTS `emprestimo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emprestimo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedido_emprestimo_id` int DEFAULT NULL,
  `grupo_id` int DEFAULT NULL,
  `montante` decimal(14,2) DEFAULT NULL,
  `taxa_juros` decimal(5,2) DEFAULT NULL,
  `data_concessao` date DEFAULT NULL,
  `aprovado_por` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_emprestimo_id` (`pedido_emprestimo_id`),
  KEY `grupo_id` (`grupo_id`),
  KEY `aprovado_por` (`aprovado_por`),
  CONSTRAINT `emprestimo_ibfk_1` FOREIGN KEY (`pedido_emprestimo_id`) REFERENCES `pedidoemprestimo` (`id`),
  CONSTRAINT `emprestimo_ibfk_2` FOREIGN KEY (`grupo_id`) REFERENCES `grupopoupanca` (`id`),
  CONSTRAINT `emprestimo_ibfk_3` FOREIGN KEY (`aprovado_por`) REFERENCES `utilizador` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emprestimo`
--

LOCK TABLES `emprestimo` WRITE;
/*!40000 ALTER TABLE `emprestimo` DISABLE KEYS */;
/*!40000 ALTER TABLE `emprestimo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupopoupanca`
--

DROP TABLE IF EXISTS `grupopoupanca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupopoupanca` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lider_id` int DEFAULT NULL,
  `nome` varchar(100) NOT NULL,
  `objetivo` text,
  `valor_minimo_deposito` decimal(14,2) NOT NULL,
  `ciclo` enum('Semanal','Mensal') NOT NULL,
  `capacidade_maxima` int NOT NULL,
  `saldo_grupo` decimal(14,2) DEFAULT '0.00',
  `reserva_minima` decimal(14,2) DEFAULT '0.00',
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `lider_id` (`lider_id`),
  CONSTRAINT `grupopoupanca_ibfk_1` FOREIGN KEY (`lider_id`) REFERENCES `utilizador` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupopoupanca`
--

LOCK TABLES `grupopoupanca` WRITE;
/*!40000 ALTER TABLE `grupopoupanca` DISABLE KEYS */;
/*!40000 ALTER TABLE `grupopoupanca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logsistema`
--

DROP TABLE IF EXISTS `logsistema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logsistema` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilizador_id` int DEFAULT NULL,
  `acao` text NOT NULL,
  `data_acao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `utilizador_id` (`utilizador_id`),
  CONSTRAINT `logsistema_ibfk_1` FOREIGN KEY (`utilizador_id`) REFERENCES `utilizador` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logsistema`
--

LOCK TABLES `logsistema` WRITE;
/*!40000 ALTER TABLE `logsistema` DISABLE KEYS */;
/*!40000 ALTER TABLE `logsistema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membrogrupo`
--

DROP TABLE IF EXISTS `membrogrupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membrogrupo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilizador_id` int DEFAULT NULL,
  `grupo_id` int DEFAULT NULL,
  `data_entrada` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `utilizador_id` (`utilizador_id`),
  KEY `grupo_id` (`grupo_id`),
  CONSTRAINT `membrogrupo_ibfk_1` FOREIGN KEY (`utilizador_id`) REFERENCES `utilizador` (`id`),
  CONSTRAINT `membrogrupo_ibfk_2` FOREIGN KEY (`grupo_id`) REFERENCES `grupopoupanca` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membrogrupo`
--

LOCK TABLES `membrogrupo` WRITE;
/*!40000 ALTER TABLE `membrogrupo` DISABLE KEYS */;
/*!40000 ALTER TABLE `membrogrupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacao`
--

DROP TABLE IF EXISTS `notificacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilizador_id` int DEFAULT NULL,
  `tipo` enum('Aprovacao','Rejeicao','Vencimento','Atraso') DEFAULT NULL,
  `mensagem` text,
  `lida` tinyint(1) DEFAULT '0',
  `data_envio` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `utilizador_id` (`utilizador_id`),
  CONSTRAINT `notificacao_ibfk_1` FOREIGN KEY (`utilizador_id`) REFERENCES `utilizador` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacao`
--

LOCK TABLES `notificacao` WRITE;
/*!40000 ALTER TABLE `notificacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parcela`
--

DROP TABLE IF EXISTS `parcela`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parcela` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emprestimo_id` int DEFAULT NULL,
  `numero_parcela` int DEFAULT NULL,
  `data_vencimento` date DEFAULT NULL,
  `valor_parcela` decimal(14,2) DEFAULT NULL,
  `estado` enum('Pendente','Pago','Atrasado') DEFAULT 'Pendente',
  `multa_aplicada` decimal(14,2) DEFAULT '0.00',
  `data_pagamento` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emprestimo_id` (`emprestimo_id`),
  CONSTRAINT `parcela_ibfk_1` FOREIGN KEY (`emprestimo_id`) REFERENCES `emprestimo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parcela`
--

LOCK TABLES `parcela` WRITE;
/*!40000 ALTER TABLE `parcela` DISABLE KEYS */;
/*!40000 ALTER TABLE `parcela` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidoemprestimo`
--

DROP TABLE IF EXISTS `pedidoemprestimo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidoemprestimo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empreendedor_id` int DEFAULT NULL,
  `membro_verificador_id` int DEFAULT NULL,
  `grupo_id` int DEFAULT NULL,
  `montante` decimal(14,2) NOT NULL,
  `finalidade` text NOT NULL,
  `prazo_meses` int DEFAULT NULL,
  `estado` enum('Pendente','Aprovado','Rejeitado','Ajuste Solicitado') DEFAULT 'Pendente',
  `data_pedido` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `empreendedor_id` (`empreendedor_id`),
  KEY `membro_verificador_id` (`membro_verificador_id`),
  KEY `grupo_id` (`grupo_id`),
  CONSTRAINT `pedidoemprestimo_ibfk_1` FOREIGN KEY (`empreendedor_id`) REFERENCES `utilizador` (`id`),
  CONSTRAINT `pedidoemprestimo_ibfk_2` FOREIGN KEY (`membro_verificador_id`) REFERENCES `utilizador` (`id`),
  CONSTRAINT `pedidoemprestimo_ibfk_3` FOREIGN KEY (`grupo_id`) REFERENCES `grupopoupanca` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidoemprestimo`
--

LOCK TABLES `pedidoemprestimo` WRITE;
/*!40000 ALTER TABLE `pedidoemprestimo` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidoemprestimo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidopromocao`
--

DROP TABLE IF EXISTS `pedidopromocao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidopromocao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilizador_id` int DEFAULT NULL,
  `estado` enum('Pendente','Aprovado','Rejeitado') DEFAULT 'Pendente',
  `data_pedido` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `utilizador_id` (`utilizador_id`),
  CONSTRAINT `pedidopromocao_ibfk_1` FOREIGN KEY (`utilizador_id`) REFERENCES `utilizador` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidopromocao`
--

LOCK TABLES `pedidopromocao` WRITE;
/*!40000 ALTER TABLE `pedidopromocao` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidopromocao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilizador`
--

DROP TABLE IF EXISTS `utilizador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilizador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `apelido` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `senha_hash` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `perfil` enum('Administrador','Líder','Membro','Empreendedor') DEFAULT 'Empreendedor',
  `saldo` decimal(14,2) DEFAULT '0.00',
  `data_registo` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `provincia` varchar(100) DEFAULT NULL,
  `Distrito` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilizador`
--

LOCK TABLES `utilizador` WRITE;
/*!40000 ALTER TABLE `utilizador` DISABLE KEYS */;
INSERT INTO `utilizador` VALUES (1,'Carlos','Júnior','carlosjr@email.com','2c4881ac0b8d786b7119c0c0c31dc43ded39f59e45708c12e03136acdc5ff891','842222222','Empreendedor',100.00,'2025-06-05 18:50:05','Maputo','KaMpfumo');
/*!40000 ALTER TABLE `utilizador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'micro_credito'
--

--
-- Dumping routines for database 'micro_credito'
--
/*!50003 DROP PROCEDURE IF EXISTS `gerirContaUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `gerirContaUsuario`(
    IN acao VARCHAR(50),
    IN p_id INT,
    IN p_nome VARCHAR(100),
    IN p_apelido VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_senha_clara VARCHAR(255),
    IN p_telefone VARCHAR(20),
    IN p_perfil ENUM('Administrador','Líder','Membro','Empreendedor'),
    IN p_saldo DECIMAL(14,2),
    IN p_provincia VARCHAR(100),
    IN p_distrito VARCHAR(100)
)
BEGIN
    -- Inserir novo usuário com senha SHA256
    IF acao = 'inserir' THEN
        IF EXISTS (SELECT 1 FROM utilizador WHERE email = p_email) THEN
            SELECT 2 AS status, 'Email já cadastrado' AS mensagem;
        ELSE
            INSERT INTO utilizador (
                nome, apelido, email, senha_hash, telefone, perfil, saldo, provincia, distrito
            )
            VALUES (
                p_nome, p_apelido, p_email, SHA2(p_senha_clara, 256), p_telefone, 
                IFNULL(p_perfil, 'Empreendedor'), IFNULL(p_saldo, 0.00), p_provincia, p_distrito
            );
            SELECT 1 AS status, 'Usuário inserido com sucesso' AS mensagem;
        END IF;
    END IF;

    -- Autenticar usuário por email e senha SHA256
    IF acao = 'autenticar' THEN
        IF EXISTS (SELECT 1 FROM utilizador WHERE email = p_email AND senha_hash = SHA2(p_senha_clara, 256)) THEN
            SELECT id, nome, apelido, email, telefone, perfil, saldo, provincia, distrito 
            FROM utilizador
            WHERE email = p_email;
        ELSE
            SELECT 3 AS status, 'Credenciais inválidas' AS mensagem;
        END IF;
    END IF;

    -- Outras ações mantidas igual...
    IF acao = 'listarTodos' THEN
        SELECT id, nome, apelido, email, telefone, perfil, saldo, data_registo, provincia, distrito 
        FROM utilizador;
    END IF;

    IF acao = 'listarPorId' THEN
        IF EXISTS (SELECT 1 FROM usuarios WHERE id = p_id) THEN
            SELECT id, nome, apelido, email, telefone, perfil, saldo, data_registo, provincia, distrito 
            FROM utilizador
            WHERE id = p_id;
        ELSE
            SELECT 3 AS status, 'Usuário não encontrado' AS mensagem;
        END IF;
    END IF;

    IF acao = 'editar' THEN
        IF EXISTS (SELECT 1 FROM usuarios WHERE id = p_id) THEN
            UPDATE utilizador
            SET 
                nome = p_nome,
                apelido = p_apelido,
                email = p_email,
                telefone = p_telefone,
                perfil = p_perfil,
                saldo = p_saldo,
                provincia = p_provincia,
                distrito = p_distrito
            WHERE id = p_id;
            SELECT 1 AS status, 'Usuário atualizado com sucesso' AS mensagem;
        ELSE
            SELECT 3 AS status, 'Usuário não encontrado' AS mensagem;
        END IF;
    END IF;

    IF acao = 'excluir' THEN
        IF EXISTS (SELECT 1 FROM utilizador WHERE id = p_id) THEN
            DELETE FROM usuarios WHERE id = p_id;
            SELECT 1 AS status, 'Usuário excluído com sucesso' AS mensagem;
        ELSE
            SELECT 3 AS status, 'Usuário não encontrado' AS mensagem;
        END IF;
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-06 16:52:58
