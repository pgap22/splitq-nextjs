/*
  Warnings:

  - You are about to drop the column `value` on the `Recharges` table. All the data in the column will be lost.
  - Added the required column `balance` to the `Recharges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recharges" DROP COLUMN "value",
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL;
