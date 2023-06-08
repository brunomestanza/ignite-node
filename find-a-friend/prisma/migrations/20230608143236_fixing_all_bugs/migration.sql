/*
  Warnings:

  - You are about to drop the column `org` on the `pets` table. All the data in the column will be lost.
  - Made the column `ownerName` on table `orgs` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `orgId` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "ownerName" SET NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "org",
ADD COLUMN     "orgId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
