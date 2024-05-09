/*
  Warnings:

  - You are about to drop the column `boughtAt` on the `CartUserProducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartUserProducts" DROP COLUMN "boughtAt",
ADD COLUMN     "purchaseAt" TIMESTAMP(3);
