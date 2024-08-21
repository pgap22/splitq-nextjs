/*
  Warnings:

  - You are about to drop the column `code` on the `SplitPay` table. All the data in the column will be lost.
  - Added the required column `balance` to the `SplitPay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SplitPay" DROP COLUMN "code",
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL;
