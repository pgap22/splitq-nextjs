-- CreateEnum
CREATE TYPE "SplitPayStatus" AS ENUM ('not_configured', 'active');

-- AlterTable
ALTER TABLE "SplitPay" ADD COLUMN     "status" "SplitPayStatus" NOT NULL DEFAULT 'not_configured';
