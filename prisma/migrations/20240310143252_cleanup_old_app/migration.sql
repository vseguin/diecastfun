/*
  Warnings:

  - You are about to drop the column `count` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `config` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `queued_cars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `queued_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `views` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `votes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `queued_tags` DROP FOREIGN KEY `FK5q1dntrn8nsbdlf86t2eg0i32`;

-- AlterTable
ALTER TABLE `cars` DROP COLUMN `count`;

-- DropTable
DROP TABLE `comments`;

-- DropTable
DROP TABLE `config`;

-- DropTable
DROP TABLE `queued_cars`;

-- DropTable
DROP TABLE `queued_tags`;

-- DropTable
DROP TABLE `views`;

-- DropTable
DROP TABLE `votes`;
