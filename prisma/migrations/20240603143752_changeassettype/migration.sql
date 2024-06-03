/*
  Warnings:

  - The values [page] on the enum `Asset_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Asset` MODIFY `type` ENUM('IMAGE', 'PAGE') NOT NULL;
