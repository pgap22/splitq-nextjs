/*
  Warnings:

  - You are about to drop the `SplitPayCode` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accesCode` to the `SplitPay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `SplitPay` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SplitPayCode" DROP CONSTRAINT "SplitPayCode_id_splitpay_fkey";

-- AlterTable
ALTER TABLE "SplitPay" ADD COLUMN     "accesCode" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "SplitPayCode";
