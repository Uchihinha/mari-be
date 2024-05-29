/*
  Warnings:

  - You are about to drop the column `frequency` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `stripeProductId` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the `PlanBenefits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlanToPlanBenefits` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurrence` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripePriceId` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_PlanToPlanBenefits` DROP FOREIGN KEY `_PlanToPlanBenefits_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PlanToPlanBenefits` DROP FOREIGN KEY `_PlanToPlanBenefits_B_fkey`;

-- DropIndex
DROP INDEX `Plan_stripeProductId_key` ON `Plan`;

-- AlterTable
ALTER TABLE `Plan` DROP COLUMN `frequency`,
    DROP COLUMN `stripeProductId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `price` DOUBLE NOT NULL,
    ADD COLUMN `recurrence` VARCHAR(191) NOT NULL,
    ADD COLUMN `stripePriceId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `PlanBenefits`;

-- DropTable
DROP TABLE `_PlanToPlanBenefits`;

-- CreateTable
CREATE TABLE `UserSubscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `status` ENUM('active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid') NOT NULL,
    `stripeSubscriptionId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserSubscription_userId_stripeSubscriptionId_key`(`userId`, `stripeSubscriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanBenefit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `planId` INTEGER NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Plan_name_key` ON `Plan`(`name`);

-- AddForeignKey
ALTER TABLE `UserSubscription` ADD CONSTRAINT `UserSubscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanBenefit` ADD CONSTRAINT `PlanBenefit_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
