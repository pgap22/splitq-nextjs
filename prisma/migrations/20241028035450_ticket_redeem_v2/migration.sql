/*
  Warnings:

  - You are about to drop the column `freeze` on the `CartUserProducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartUserProducts" DROP COLUMN "freeze",
ADD COLUMN     "redeem_enabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "request_redeem" BOOLEAN DEFAULT false;
