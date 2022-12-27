-- CreateIndex
CREATE FULLTEXT INDEX `cars_brand_idx` ON `cars`(`brand`);

-- CreateIndex
CREATE FULLTEXT INDEX `cars_maker_idx` ON `cars`(`maker`);

-- CreateIndex
CREATE FULLTEXT INDEX `cars_model_idx` ON `cars`(`model`);
