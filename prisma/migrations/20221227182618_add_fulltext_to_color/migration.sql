-- DropIndex
DROP INDEX `cars_brand_idx` ON `cars`;

-- DropIndex
DROP INDEX `cars_maker_idx` ON `cars`;

-- DropIndex
DROP INDEX `cars_model_idx` ON `cars`;

-- CreateIndex
CREATE FULLTEXT INDEX `cars_brand_maker_model_color_idx` ON `cars`(`brand`, `maker`, `model`, `color`);
