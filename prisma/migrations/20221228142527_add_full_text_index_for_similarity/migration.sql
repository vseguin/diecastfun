-- CreateIndex
CREATE FULLTEXT INDEX `cars_maker_model_idx` ON `cars`(`maker`, `model`);
