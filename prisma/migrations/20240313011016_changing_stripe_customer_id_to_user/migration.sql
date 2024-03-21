/*
  Warnings:

  - You are about to drop the column `stripeCustomerId` on the `UserSubscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `stripeCustomerId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserSubscription` DROP COLUMN `stripeCustomerId`;
