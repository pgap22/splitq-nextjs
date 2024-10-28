/*
  Warnings:

  - You are about to drop the column `redeem_enabled` on the `CartUserProducts` table. All the data in the column will be lost.
  - You are about to drop the column `request_redeem` on the `CartUserProducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartUserProducts" DROP COLUMN "redeem_enabled",
DROP COLUMN "request_redeem",
ADD COLUMN     "refunded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "refundedAt" TIMESTAMP(3),
ADD COLUMN     "request_refund" BOOLEAN DEFAULT false;
