/*
  Warnings:

  - Added the required column `type` to the `Recharges` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RechargeType" AS ENUM ('default', 'splitpay');

-- AlterTable
ALTER TABLE "Recharges" ADD COLUMN     "type" "RechargeType" NOT NULL,
ALTER COLUMN "modID" DROP NOT NULL;
