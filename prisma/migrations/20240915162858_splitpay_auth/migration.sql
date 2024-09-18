/*
  Warnings:

  - You are about to drop the column `accesCode` on the `SplitPay` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SplitPay" DROP COLUMN "accesCode";

-- AlterTable
ALTER TABLE "SplitPaySession" ADD COLUMN     "accesCode" TEXT;
