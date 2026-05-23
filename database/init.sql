CREATE DATABASE IF NOT EXISTS maz_travel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'maz_user'@'%' IDENTIFIED BY 'maz_pass';
GRANT ALL PRIVILEGES ON maz_travel.* TO 'maz_user'@'%';
FLUSH PRIVILEGES;
USE maz_travel;
