/*
  Warnings:

  - You are about to drop the column `balance` on the `SplitPay` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `SplitPay` table. All the data in the column will be lost.
  - Added the required column `key` to the `SplitPay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_splitpay` to the `SplitPayCode` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SplitPay" DROP CONSTRAINT "SplitPay_id_user_fkey";

-- AlterTable
ALTER TABLE "SplitPay" DROP COLUMN "balance",
DROP COLUMN "id_user",
ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SplitPayCode" ADD COLUMN     "id_splitpay" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SplitPaySession" (
    "id" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "id_user" TEXT,
    "id_splitpay" TEXT NOT NULL,

    CONSTRAINT "SplitPaySession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SplitPaySession" ADD CONSTRAINT "SplitPaySession_id_splitpay_fkey" FOREIGN KEY ("id_splitpay") REFERENCES "SplitPay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SplitPaySession" ADD CONSTRAINT "SplitPaySession_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SplitPayCode" ADD CONSTRAINT "SplitPayCode_id_splitpay_fkey" FOREIGN KEY ("id_splitpay") REFERENCES "SplitPay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
