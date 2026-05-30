-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'EDITOR') NOT NULL DEFAULT 'ADMIN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quoteNumber` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL DEFAULT 'fr',
    `serviceType` ENUM('TRANSFER', 'DISPOSITION', 'EXCURSION', 'ACTIVITY') NOT NULL,
    `pickupLocation` VARCHAR(191) NULL,
    `dropLocation` VARCHAR(191) NULL,
    `duration` VARCHAR(191) NULL,
    `excursionId` INTEGER NULL,
    `activityId` INTEGER NULL,
    `date` DATETIME(3) NOT NULL,
    `time` VARCHAR(191) NULL,
    `adults` INTEGER NOT NULL DEFAULT 1,
    `children` INTEGER NOT NULL DEFAULT 0,
    `babies` INTEGER NOT NULL DEFAULT 0,
    `vehicleType` VARCHAR(191) NULL,
    `message` TEXT NULL,
    `status` ENUM('PENDING', 'QUOTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `adminPrice` DOUBLE NULL,
    `adminCurrency` VARCHAR(191) NULL DEFAULT 'MAD',
    `adminNote` TEXT NULL,
    `sentAt` DATETIME(3) NULL,
    `confirmedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Quote_quoteNumber_key`(`quoteNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Excursion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `titleFr` VARCHAR(191) NOT NULL,
    `titleEn` VARCHAR(191) NULL,
    `titleEs` VARCHAR(191) NULL,
    `descriptionFr` TEXT NOT NULL,
    `descriptionEn` TEXT NULL,
    `descriptionEs` TEXT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `departure` VARCHAR(191) NOT NULL DEFAULT 'Marrakech',
    `priceMad` DOUBLE NOT NULL,
    `priceEur` DOUBLE NULL,
    `priceUsd` DOUBLE NULL,
    `image` VARCHAR(191) NOT NULL,
    `gallery` TEXT NULL,
    `tag` VARCHAR(191) NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `badges` TEXT NULL,
    `programFr` TEXT NULL,
    `programEn` TEXT NULL,
    `programEs` TEXT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Excursion_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `titleFr` VARCHAR(191) NOT NULL,
    `titleEn` VARCHAR(191) NULL,
    `titleEs` VARCHAR(191) NULL,
    `descriptionFr` TEXT NOT NULL,
    `descriptionEn` TEXT NULL,
    `descriptionEs` TEXT NULL,
    `category` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `priceMad` DOUBLE NOT NULL,
    `priceEur` DOUBLE NULL,
    `priceUsd` DOUBLE NULL,
    `image` VARCHAR(191) NOT NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Activity_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransferRoute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fromLoc` VARCHAR(191) NOT NULL,
    `toLoc` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `priceMad` DOUBLE NOT NULL,
    `priceEur` DOUBLE NULL,
    `priceUsd` DOUBLE NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `pricePerDayMad` DOUBLE NOT NULL DEFAULT 0,
    `pricePerDayEur` DOUBLE NULL,
    `image` VARCHAR(191) NOT NULL,
    `features` TEXT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimonial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `flag` VARCHAR(191) NULL,
    `rating` INTEGER NOT NULL DEFAULT 5,
    `comment` TEXT NOT NULL,
    `language` VARCHAR(191) NULL DEFAULT 'fr',
    `avatar` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gallery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `image` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `ord` INTEGER NOT NULL DEFAULT 0,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `service` VARCHAR(191) NULL,
    `date` DATETIME(3) NULL,
    `persons` INTEGER NULL,
    `message` TEXT NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `keyName` VARCHAR(191) NOT NULL,
    `value` TEXT NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Setting_keyName_key`(`keyName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Quote` ADD CONSTRAINT `Quote_excursionId_fkey` FOREIGN KEY (`excursionId`) REFERENCES `Excursion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quote` ADD CONSTRAINT `Quote_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
