/*
  Warnings:

  - Added the required column `thumbnail` to the `TutorialVideos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TutorialVideos` ADD COLUMN `thumbnail` VARCHAR(191) NOT NULL;
