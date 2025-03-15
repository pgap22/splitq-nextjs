/*
  Warnings:

  - You are about to drop the column `quantity` on the `Items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Items" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "ItemsCombo" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;
