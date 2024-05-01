-- AlterTable
ALTER TABLE `images` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;
