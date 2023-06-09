/*
  Warnings:

  - The `adoptionRequirements` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "adoptionRequirements",
ADD COLUMN     "adoptionRequirements" TEXT[];
