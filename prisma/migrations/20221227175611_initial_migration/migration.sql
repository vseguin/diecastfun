-- CreateTable
CREATE TABLE `brands` (
    `name` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cars` (
    `id` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(255) NULL,
    `color` VARCHAR(255) NULL,
    `count` INTEGER NOT NULL,
    `customized` BIT(1) NULL,
    `era` VARCHAR(255) NULL,
    `insertion_date` DATE NULL,
    `maker` VARCHAR(255) NULL,
    `model` VARCHAR(255) NULL,
    `restored` BIT(1) NULL,
    `scale` VARCHAR(255) NULL,

    INDEX `BrandIndex`(`brand`),
    INDEX `CustomizedIndex`(`customized`),
    INDEX `MakerIndex`(`maker`),
    INDEX `RestoredIndex`(`restored`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(255) NULL,
    `username` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `config` (
    `key` VARCHAR(100) NOT NULL,
    `value` VARCHAR(1000) NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `makers` (
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `queued_cars` (
    `id` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(255) NULL,
    `color` VARCHAR(255) NULL,
    `count` INTEGER NOT NULL,
    `customized` BIT(1) NULL,
    `era` VARCHAR(255) NULL,
    `insertion_date` DATE NULL,
    `maker` VARCHAR(255) NULL,
    `model` VARCHAR(255) NULL,
    `restored` BIT(1) NULL,
    `scale` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `queued_tags` (
    `id` VARCHAR(255) NOT NULL,
    `tags` VARCHAR(255) NOT NULL,

    INDEX `FK5q1dntrn8nsbdlf86t2eg0i32`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` VARCHAR(255) NOT NULL,
    `tags` VARCHAR(255) NOT NULL,

    INDEX `FKt4n1dd2ftua53wow42sybac0r`(`id`),
    INDEX `TagsIndex`(`tags`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `views` (
    `number` INTEGER NOT NULL,
    `car_id` VARCHAR(255) NOT NULL DEFAULT '',

    PRIMARY KEY (`car_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `votes` (
    `id` VARCHAR(100) NOT NULL,
    `number` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wanted_cars` (
    `id` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(255) NULL,
    `maker` VARCHAR(255) NULL,
    `model` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `queued_tags` ADD CONSTRAINT `FK5q1dntrn8nsbdlf86t2eg0i32` FOREIGN KEY (`id`) REFERENCES `queued_cars`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `FK_7rl33od3pg8xd0fbmxq0fotsy` FOREIGN KEY (`id`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
