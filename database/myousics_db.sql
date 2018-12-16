-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 16 Des 2018 pada 02.55
-- Versi Server: 10.1.21-MariaDB
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
-- Struktur dari tabel `tb_playlist_user`
--

CREATE TABLE `tb_playlist_user` (
  `id` int(20) NOT NULL,
  `id_song` varchar(200) NOT NULL,
  `title_song` text NOT NULL,
  `channel_song` text NOT NULL,
  `duration_song` varchar(20) NOT NULL,
  `id_usr` int(50) NOT NULL,
  `date_save` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `tb_playlist_user`
--

INSERT INTO `tb_playlist_user` (`id`, `id_song`, `title_song`, `channel_song`, `duration_song`, `id_usr`, `date_save`) VALUES
(13, 'm7Bc3pLyij0', 'Marshmello ft. Bastille - Happier (Official Music Video)', 'Marshmello', '3:54', 1, '2018-12-16 02:35:37');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_user_access`
--

CREATE TABLE `tb_user_access` (
  `id_usr` int(50) NOT NULL,
  `username_usr` varchar(50) NOT NULL,
  `pass_usr` varchar(50) NOT NULL,
  `email_usr` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `tb_user_access`
--

INSERT INTO `tb_user_access` (`id_usr`, `username_usr`, `pass_usr`, `email_usr`) VALUES
(1, 'candrandiyasa', '4c5bde74a8f110656874902f07378009', 'candrandiyasa@gmail.com'),
(7, 'made', 'cfecdb276f634854f3ef915e2e980c31', 'made@gmail.com'),
(8, 'made', 'cfecdb276f634854f3ef915e2e980c31', 'made@gmail.com'),
(9, 'madecandrandiyasa', '849dc336235d5cbd4a581a3a94106216', 'madecandra@gmail.com'),
(10, 'madecandrandiyasa', '849dc336235d5cbd4a581a3a94106216', 'madecandra@gmail.com'),
(11, 'made', 'cfecdb276f634854f3ef915e2e980c31', 'made@gmail.com'),
(12, 'kadek', 'cfecdb276f634854f3ef915e2e980c31', 'kadek@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_playlist_user`
--
ALTER TABLE `tb_playlist_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usr` (`id_usr`);

--
-- Indexes for table `tb_user_access`
--
ALTER TABLE `tb_user_access`
  ADD PRIMARY KEY (`id_usr`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_playlist_user`
--
ALTER TABLE `tb_playlist_user`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `tb_user_access`
--
ALTER TABLE `tb_user_access`
  MODIFY `id_usr` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tb_playlist_user`
--
ALTER TABLE `tb_playlist_user`
  ADD CONSTRAINT `tb_playlist_user_ibfk_1` FOREIGN KEY (`id_usr`) REFERENCES `tb_user_access` (`id_usr`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
