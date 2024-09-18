/*
  Warnings:

  - You are about to drop the column `accesCode` on the `SplitPaySession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SplitPay" ADD COLUMN     "accesCode" TEXT;

-- AlterTable
ALTER TABLE "SplitPaySession" DROP COLUMN "accesCode";
