/*
  Warnings:

  - Made the column `ownerName` on table `orgs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "ownerName" SET NOT NULL;
