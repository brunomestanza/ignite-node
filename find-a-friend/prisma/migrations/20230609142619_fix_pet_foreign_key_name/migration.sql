/*
  Warnings:

  - You are about to drop the column `org` on the `pets` table. All the data in the column will be lost.
  - Added the required column `orgId` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "org",
ADD COLUMN     "orgId" TEXT NOT NULL;
