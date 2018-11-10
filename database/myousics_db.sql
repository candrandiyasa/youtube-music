-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2018 at 05:21 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myousics_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_playlist_user`
--

CREATE TABLE `tb_playlist_user` (
  `id_song` varchar(300) NOT NULL,
  `id_usr` int(50) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tb_user_access`
--

CREATE TABLE `tb_user_access` (
  `id_usr` int(50) NOT NULL,
  `username_usr` varchar(50) NOT NULL,
  `pass_usr` varchar(50) NOT NULL,
  `email_usr` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_user_access`
--

INSERT INTO `tb_user_access` (`id_usr`, `username_usr`, `pass_usr`, `email_usr`) VALUES
(1, 'candrandiyasa', '182', 'candrandiyasa@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_playlist_user`
--
ALTER TABLE `tb_playlist_user`
  ADD PRIMARY KEY (`id_song`),
  ADD KEY `id_usr` (`id_usr`);

--
-- Indexes for table `tb_user_access`
--
ALTER TABLE `tb_user_access`
  ADD PRIMARY KEY (`id_usr`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_playlist_user`
--
ALTER TABLE `tb_playlist_user`
  ADD CONSTRAINT `tb_playlist_user_ibfk_1` FOREIGN KEY (`id_usr`) REFERENCES `tb_user_access` (`id_usr`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
