-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 20 Ara 2022, 04:19:43
-- Sunucu sürümü: 5.7.31
-- PHP Sürümü: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `csduffle`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(255) NOT NULL,
  `persona_name` varchar(255) NOT NULL,
  `avatar` varchar(350) NOT NULL,
  `balance` mediumint(9) NOT NULL,
  `public_id` varchar(64) NOT NULL,
  `secret_id` varchar(64) NOT NULL,
  `steam_id` varchar(22) NOT NULL,
  `trade_link` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`secret_id`),
  UNIQUE KEY `public_id` (`public_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`username`, `persona_name`, `avatar`, `balance`, `public_id`, `secret_id`, `steam_id`, `trade_link`) VALUES
('oynozan', 'oynozan', 'https://avatars.akamai.steamstatic.com/633d850f16969bde83458e74c7c3f2a311f9281a.jpg', 0, '04b1c375-b982-45f4-88be-f87e926c0fc4', '4db46bf7-698d-4006-942e-0bbd6f1fe1a8', '76561198169035551', 'https://steamcommunity.com/tradeoffer/new/?partner=208769823&token=x0cXEhsl');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
