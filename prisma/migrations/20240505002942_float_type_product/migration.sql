/*
  Warnings:

  - You are about to alter the column `value` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `discountPercent` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `value` DOUBLE NOT NULL,
    MODIFY `discountPercent` DOUBLE NOT NULL;
