/*
  Warnings:

  - Added the required column `categoryId` to the `Template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `templatePreview` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Template` ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `templatePreview` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `TemplateCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Template` ADD CONSTRAINT `Template_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `TemplateCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
