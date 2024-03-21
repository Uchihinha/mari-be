/*
  Warnings:

  - Added the required column `benefitsId` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserSubscription` ADD COLUMN `benefitsId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `SubscriptionBenefits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `stripeProductId` VARCHAR(191) NOT NULL,
    `websiteAmount` INTEGER NOT NULL,

    UNIQUE INDEX `SubscriptionBenefits_stripeProductId_key`(`stripeProductId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSubscription` ADD CONSTRAINT `UserSubscription_benefitsId_fkey` FOREIGN KEY (`benefitsId`) REFERENCES `SubscriptionBenefits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
