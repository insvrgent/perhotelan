-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2023 at 08:51 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `username`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(33, 'admin', 'admin', 'admin', '2023-06-21 22:17:18', '2023-06-21 22:17:18'),
(34, 'res1', 'res', 'resepsionis', '2023-06-21 20:18:36', '2023-06-21 20:18:36'),
(35, NULL, NULL, '', '2023-08-03 11:13:30', '2023-08-03 11:13:30');

-- --------------------------------------------------------

--
-- Table structure for table `bid`
--

CREATE TABLE `bid` (
  `transaksi_id` int(4) NOT NULL,
  `customer_id` int(4) NOT NULL,
  `product_id` int(4) NOT NULL,
  `price` int(12) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bid`
--

INSERT INTO `bid` (`transaksi_id`, `customer_id`, `product_id`, `price`, `createdAt`, `updatedAt`) VALUES
(301, 3, 4, 25150000, '2022-05-21', '2022-05-21'),
(302, 3, 4, 25200000, '2022-05-21', '2022-05-21'),
(303, 3, 4, 25250000, '2022-05-21', '2022-05-21'),
(304, 3, 3, 167, '2022-05-21', '2022-05-21'),
(305, 3, 3, 171, '2022-05-21', '2022-05-21'),
(306, 3, 3, 671000, '2022-05-21', '2022-05-21'),
(307, 3, 4, 25250000, '2022-05-21', '2022-05-21'),
(308, 3, 4, 25250000, '2022-05-21', '2022-05-21'),
(309, 3, 4, 25250000, '2022-05-21', '2022-05-21'),
(310, 3, 5, 3000, '2022-05-21', '2022-05-21'),
(311, 3, 5, 5000, '2022-05-21', '2022-05-21'),
(312, 3, 5, 7000, '2022-05-21', '2022-05-21'),
(313, 3, 5, 9000, '2022-05-21', '2022-05-21'),
(314, 3, 4, 25300000, '2022-05-21', '2022-05-21'),
(315, 3, 4, 25550000, '2022-05-21', '2022-05-21'),
(316, 3, 6, 50000, '2022-05-21', '2022-05-21'),
(317, 3, 4, 25550000, '2022-05-21', '2022-05-21'),
(318, 3, 6, 50000, '2022-05-21', '2022-05-21'),
(319, 3, 6, 50000, '2022-05-21', '2022-05-21'),
(320, 3, 6, 50000, '2022-05-21', '2022-05-21'),
(321, 3, 4, 26550000, '2022-05-21', '2022-05-21'),
(322, 3, 4, 26550000, '2022-05-21', '2022-05-21'),
(323, 3, 4, 26550000, '2022-05-21', '2022-05-21'),
(324, 3, 4, 26550000, '2022-05-21', '2022-05-21'),
(325, 3, 4, 26550000, '2022-05-21', '2022-05-21'),
(326, 3, 4, 26550000, '2022-05-21', '2022-05-21'),
(327, 3, 6, 510000, '2022-05-21', '2022-05-21'),
(328, 3, 7, 11000, '2022-05-21', '2022-05-21'),
(329, 3, 7, 15000, '2022-05-21', '2022-05-21'),
(330, 3, 6, 530000, '2022-05-21', '2022-05-21'),
(331, 3, 6, 550000, '2022-05-21', '2022-05-21'),
(332, 3, 1, 17000, '2022-05-21', '2022-05-21'),
(333, 3, 1, 19000, '2022-05-21', '2022-05-21'),
(334, 3, 6, 570000, '2022-05-21', '2022-05-21'),
(335, 3, 6, 590000, '2022-05-21', '2022-05-21'),
(336, 3, 6, 610000, '2022-05-21', '2022-05-21'),
(337, 3, 6, 630000, '2022-05-21', '2022-05-21'),
(338, 3, 7, 1171000, '2022-05-21', '2022-05-21'),
(339, 3, 8, 550000, '2022-05-21', '2022-05-21'),
(340, 3, 8, 600000, '2022-05-21', '2022-05-21'),
(341, 3, 6, 650000, '2022-05-21', '2022-05-21'),
(342, 3, 6, 670000, '2022-05-21', '2022-05-21'),
(343, 3, 6, 690000, '2022-05-21', '2022-05-21'),
(344, 3, 6, 710000, '2022-05-21', '2022-05-21'),
(345, 3, 6, 730000, '2022-05-21', '2022-05-21'),
(346, 3, 6, 750000, '2022-05-21', '2022-05-21'),
(347, 3, 6, 770000, '2022-05-21', '2022-05-21'),
(348, 3, 6, 790000, '2022-05-21', '2022-05-21'),
(349, 3, 1, 21000, '2022-05-21', '2022-05-21'),
(350, 3, 1, 23000, '2022-05-21', '2022-05-21'),
(351, 1, 1, 25000, '2022-05-21', '2022-05-21'),
(352, 1, 1, 27000, '2022-05-21', '2022-05-21'),
(353, 1, 6, 810000, '2022-05-21', '2022-05-21'),
(354, 1, 6, 830000, '2022-05-21', '2022-05-21'),
(355, 1, 7, 1671000, '2022-05-21', '2022-05-21'),
(356, 10, 1, 29000, '2022-05-21', '2022-05-21'),
(357, 10, 7, 2171000, '2022-05-21', '2022-05-21'),
(358, 5, 1, 31000, '2022-05-21', '2022-05-21'),
(359, 50, 1, 33000, '2022-05-21', '2022-05-21'),
(360, 4, 1, 33000, '2022-05-21', '2022-05-21'),
(361, 3, 1, 12000, '2022-05-21', '2022-05-21'),
(362, 3, 1, 14000, '2022-05-21', '2022-05-21'),
(363, 3, 1, 16000, '2022-05-21', '2022-05-21'),
(364, 3, 1, 20000, '2022-05-21', '2022-05-21'),
(365, 3, 1, 22000, '2022-05-21', '2022-05-21'),
(366, 1, 1, 24000, '2022-05-21', '2022-05-21'),
(367, 3, 1, 26000, '2022-05-21', '2022-05-21'),
(368, 3, 1, 26000, '2022-05-21', '2022-05-21'),
(369, 3, 1, 26000, '2022-05-21', '2022-05-21'),
(370, 3, 1, 26000, '2022-05-21', '2022-05-21'),
(371, 3, 1, 26000, '2022-05-21', '2022-05-21'),
(372, 3, 1, 26000, '2022-05-21', '2022-05-21'),
(373, 3, 1, 28000, '2022-05-21', '2022-05-21'),
(374, 3, 1, 42000, '2022-05-21', '2022-05-21'),
(375, 3342, 1, 44000, '2022-05-21', '2022-05-21'),
(376, 3, 1, 46000, '2022-05-21', '2022-05-21'),
(377, 3, 1, 48000, '2022-05-21', '2022-05-21'),
(378, 3, 1, 50000, '2022-05-21', '2022-05-21'),
(379, 3, 7, 100000, '2022-05-21', '2022-05-21'),
(380, 3, 7, 150000, '2022-05-21', '2022-05-21'),
(381, 3, 7, 200000, '2022-05-21', '2022-05-21'),
(382, 3, 1, 52000, '2022-05-21', '2022-05-21'),
(383, 3, 6, 110000, '2022-05-21', '2022-05-21'),
(384, 3, 6, 130000, '2022-05-21', '2022-05-21'),
(385, 3321, 1, 72000, '2022-05-22', '2022-05-22'),
(386, 3321, 6, 210000, '2022-05-22', '2022-05-22'),
(387, 3321, 7, 250000, '2022-05-22', '2022-05-22');

-- --------------------------------------------------------

--
-- Table structure for table `detail_pemesanan`
--

CREATE TABLE `detail_pemesanan` (
  `id_detail_pemesanan` int(11) NOT NULL,
  `id_pemesanan` int(11) NOT NULL,
  `id_kamar` int(11) DEFAULT NULL,
  `harga` int(11) NOT NULL,
  `tgl_akses` text NOT NULL,
  `bln_akses` text NOT NULL,
  `thn_akses` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_pemesanann`
--

CREATE TABLE `detail_pemesanann` (
  `id_detail_pemesanan` int(11) NOT NULL,
  `id_pemesanan` int(11) NOT NULL,
  `id_kamar` int(11) DEFAULT NULL,
  `tgl_akses` text NOT NULL,
  `bln_akses` text NOT NULL,
  `thn_akses` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id_detail_transaksi` int(11) NOT NULL,
  `transaksi_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` double DEFAULT NULL,
  `qty` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pemesanan`
--

CREATE TABLE `pemesanan` (
  `id_pemesanan` int(11) NOT NULL,
  `nomor_pemesanan` int(10) NOT NULL,
  `nama_pemesan` varchar(100) NOT NULL,
  `email_pemesan` varchar(100) NOT NULL,
  `tgl_pemesanan` date NOT NULL,
  `tgl_check_in` date NOT NULL,
  `tgl_check_out` date NOT NULL,
  `nama_tamu` varchar(100) NOT NULL,
  `jumlah_kamar` int(11) NOT NULL,
  `totalharga` int(11) NOT NULL,
  `tipe_id` int(11) NOT NULL,
  `status_pemesanan` text NOT NULL,
  `admin_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `lantai` int(3) NOT NULL,
  `nomor` int(3) DEFAULT NULL,
  `tipe` int(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `lantai`, `nomor`, `tipe`, `createdAt`, `updatedAt`) VALUES
(22, 1, 1, 1, '2023-06-21 20:19:10', '2023-06-21 20:24:00'),
(23, 1, 2, 1, '2023-06-21 20:19:10', '2023-06-21 20:24:01'),
(24, 1, 3, 1, '2023-06-21 20:19:10', '2023-06-21 20:24:04'),
(25, 1, 4, 1, '2023-06-21 20:19:11', '2023-06-21 20:24:14'),
(26, 1, 5, 1, '2023-06-21 20:19:11', '2023-06-21 20:24:07'),
(27, 1, 6, 1, '2023-06-21 20:19:11', '2023-06-21 20:24:09'),
(28, 1, 7, 1, '2023-06-21 20:19:12', '2023-06-21 20:24:11'),
(29, 1, 8, 1, '2023-06-21 20:19:12', '2023-06-21 20:24:17'),
(30, 1, 9, 1, '2023-06-21 20:19:13', '2023-06-21 20:24:20'),
(31, 1, 10, 2, '2023-06-21 20:20:01', '2023-06-21 20:20:09'),
(32, 1, 11, 2, '2023-06-21 20:20:02', '2023-06-21 20:20:13'),
(33, 1, 12, 2, '2023-06-21 20:20:02', '2023-06-21 20:20:17'),
(34, 1, 13, 2, '2023-06-21 20:20:02', '2023-06-21 20:20:19'),
(35, 1, 14, 2, '2023-06-21 20:20:03', '2023-06-21 20:20:23'),
(36, 1, 15, 2, '2023-06-21 20:20:03', '2023-06-21 20:20:30'),
(37, 1, 16, 2, '2023-06-21 20:20:04', '2023-06-21 20:20:34'),
(38, 1, 17, 2, '2023-06-21 20:20:04', '2023-06-21 20:20:38'),
(39, 1, 18, 2, '2023-06-21 20:20:04', '2023-06-21 20:20:41'),
(40, 1, 19, 2, '2023-06-21 20:20:05', '2023-06-21 20:20:43'),
(41, 1, 20, 2, '2023-06-21 20:20:06', '2023-06-21 20:20:47'),
(42, 1, 21, 3, '2023-06-21 20:20:48', '2023-06-21 20:24:27'),
(43, 1, 22, 3, '2023-06-21 20:20:49', '2023-06-21 20:24:32'),
(44, 1, 23, 3, '2023-06-21 20:20:49', '2023-06-21 20:24:36'),
(45, 1, 24, 3, '2023-06-21 20:20:49', '2023-06-21 20:24:41'),
(46, 1, 25, 3, '2023-06-21 20:20:50', '2023-06-21 20:24:46'),
(47, 1, 26, 3, '2023-06-21 20:20:50', '2023-06-21 20:24:50'),
(48, 1, 27, 3, '2023-06-21 20:20:51', '2023-06-21 20:25:50'),
(49, 1, 28, 3, '2023-06-21 20:20:51', '2023-06-21 20:25:44'),
(50, 1, 29, 3, '2023-06-21 20:20:53', '2023-06-21 20:25:47');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220110013855-create-product.js'),
('20220110014736-create-admin.js'),
('20220110015224-create-customer.js'),
('20220110015339-create-transaksi.js'),
('20220110015450-create-detail-transaksi.js');

-- --------------------------------------------------------

--
-- Table structure for table `tipe_kamar`
--

CREATE TABLE `tipe_kamar` (
  `tipe_id` int(11) NOT NULL,
  `nama_tipe` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `harga` int(12) NOT NULL,
  `deskripsi` text NOT NULL,
  `foto` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tipe_kamar`
--

INSERT INTO `tipe_kamar` (`tipe_id`, `nama_tipe`, `nama`, `harga`, `deskripsi`, `foto`, `createdAt`, `updatedAt`) VALUES
(1, 'gold', '', 1250000, '', 'http://localhost:8080/image/gold.jpg', '2023-03-10 10:00:13', '2023-03-10 10:00:13'),
(2, 'silver', '', 60000, '', 'http://localhost:8080/image/silver.jpg', '2023-03-10 10:02:16', '2023-03-10 10:02:16'),
(3, 'kos triplek', '', 10000, '', 'http://localhost:8080/image/triplek.jpg', '2023-03-10 10:02:29', '2023-03-10 10:02:29'),
(4, 'temPat samPah', '', 5000, '', 'http://localhost:8080/image/gold.jpg', '2023-03-10 10:29:15', '2023-03-10 10:29:15');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `transaksi_id` int(11) NOT NULL,
  `nomor_pemesanan` int(10) NOT NULL,
  `nama_pemesanan` varchar(100) NOT NULL,
  `email_pemesanan` varchar(100) NOT NULL,
  `tgl_pemesanan` date NOT NULL,
  `tgl_check_in` date NOT NULL,
  `tgl_check_out` date NOT NULL,
  `nama_tamu` varchar(100) NOT NULL,
  `jumlah_kamar` int(11) NOT NULL,
  `id_tipe_kamar` int(11) NOT NULL,
  `status_pemesanan` text NOT NULL,
  `id_user` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `bid`
--
ALTER TABLE `bid`
  ADD PRIMARY KEY (`transaksi_id`);

--
-- Indexes for table `detail_pemesanan`
--
ALTER TABLE `detail_pemesanan`
  ADD PRIMARY KEY (`id_detail_pemesanan`);

--
-- Indexes for table `detail_pemesanann`
--
ALTER TABLE `detail_pemesanann`
  ADD PRIMARY KEY (`id_detail_pemesanan`);

--
-- Indexes for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id_detail_transaksi`),
  ADD KEY `transaksi_id` (`transaksi_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `pemesanan`
--
ALTER TABLE `pemesanan`
  ADD PRIMARY KEY (`id_pemesanan`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tipe_kamar`
--
ALTER TABLE `tipe_kamar`
  ADD PRIMARY KEY (`tipe_id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`transaksi_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `bid`
--
ALTER TABLE `bid`
  MODIFY `transaksi_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=388;

--
-- AUTO_INCREMENT for table `detail_pemesanan`
--
ALTER TABLE `detail_pemesanan`
  MODIFY `id_detail_pemesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `detail_pemesanann`
--
ALTER TABLE `detail_pemesanann`
  MODIFY `id_detail_pemesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id_detail_transaksi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pemesanan`
--
ALTER TABLE `pemesanan`
  MODIFY `id_pemesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `tipe_kamar`
--
ALTER TABLE `tipe_kamar`
  MODIFY `tipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `transaksi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `detail_transaksi_ibfk_1` FOREIGN KEY (`transaksi_id`) REFERENCES `transaksi` (`transaksi_id`),
  ADD CONSTRAINT `detail_transaksi_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `tipe_kamar` (`tipe_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
