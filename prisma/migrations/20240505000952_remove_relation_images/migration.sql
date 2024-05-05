/*
  Warnings:

  - You are about to drop the `_imagetoproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_imagetoproduct` DROP FOREIGN KEY `_ImageToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_imagetoproduct` DROP FOREIGN KEY `_ImageToProduct_B_fkey`;

-- DropTable
DROP TABLE `_imagetoproduct`;
