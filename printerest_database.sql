-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `image_id` int DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `content` varchar(200) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

INSERT INTO `comments` (`comment_id`, `user_id`, `image_id`, `date`, `content`) VALUES
(6,	5,	7,	'2012-04-23 18:25:44',	'How Beautiful, post more please!!'),
(7,	5,	7,	'2012-04-23 18:25:44',	'How Beautiful, post more please!!');

CREATE TABLE `images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `path` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `descr` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

INSERT INTO `images` (`image_id`, `name`, `path`, `descr`, `user_id`) VALUES
(7,	'Tranh dep',	'beautiful-tree.jpg',	'There are many trees in the garden.',	5);

CREATE TABLE `storage` (
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `date_save` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`,`image_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `storage_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `storage_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;


CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `full_name` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `age` int DEFAULT NULL,
  `avatar` varchar(10000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

INSERT INTO `users` (`user_id`, `email`, `password`, `full_name`, `age`, `avatar`) VALUES
(5,	'musiclove@gmail.com',	'$2b$10$/Fik6aVHj.lXvPNqbkY/ae85rYRo.KNVP8mhOP3iygjSe.6ZsKBri',	'Yeu Am Nhac',	75,	'avatar.jpg');

-- 2023-05-03 16:34:02