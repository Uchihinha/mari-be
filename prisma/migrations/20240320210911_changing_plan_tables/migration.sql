/*
  Warnings:

  - You are about to drop the `SubscriptionBenefits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSubscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserSubscription` DROP FOREIGN KEY `UserSubscription_benefitsId_fkey`;

-- DropForeignKey
ALTER TABLE `UserSubscription` DROP FOREIGN KEY `UserSubscription_userId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `planId` INTEGER NULL,
    ADD COLUMN `stripeSubscriptionId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `SubscriptionBenefits`;

-- DropTable
DROP TABLE `UserSubscription`;

-- CreateTable
CREATE TABLE `Plan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `frequency` ENUM('YEARLY', 'MONTHLY') NOT NULL,
    `stripeProductId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Plan_stripeProductId_key`(`stripeProductId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanBenefits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `websiteAmount` INTEGER NOT NULL,
    `planId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PlanToPlanBenefits` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PlanToPlanBenefits_AB_unique`(`A`, `B`),
    INDEX `_PlanToPlanBenefits_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlanToPlanBenefits` ADD CONSTRAINT `_PlanToPlanBenefits_A_fkey` FOREIGN KEY (`A`) REFERENCES `Plan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlanToPlanBenefits` ADD CONSTRAINT `_PlanToPlanBenefits_B_fkey` FOREIGN KEY (`B`) REFERENCES `PlanBenefits`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
