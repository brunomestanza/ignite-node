/*
  Warnings:

  - You are about to drop the column `idependencyLevel` on the `pets` table. All the data in the column will be lost.
  - Added the required column `independency_level` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "idependencyLevel",
ADD COLUMN     "independency_level" "IdependencyLevel" NOT NULL;
