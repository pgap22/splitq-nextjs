/*
  Warnings:

  - A unique constraint covering the columns `[id_user]` on the table `SplitPaySession` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_splitpay]` on the table `SplitPaySession` will be added. If there are existing duplicate values, this will fail.
  - Made the column `id_user` on table `SplitPaySession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SplitPaySession" ALTER COLUMN "id_user" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SplitPaySession_id_user_key" ON "SplitPaySession"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "SplitPaySession_id_splitpay_key" ON "SplitPaySession"("id_splitpay");
