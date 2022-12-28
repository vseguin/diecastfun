/*
  Warnings:

  - A unique constraint covering the columns `[id,tags]` on the table `tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tags_id_tags_key` ON `tags`(`id`, `tags`);
