/*
  Warnings:

  - You are about to drop the column `id_item_combo` on the `Items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_id_item_combo_fkey";

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "id_item_combo";

-- CreateTable
CREATE TABLE "ItemsCombo" (
    "id" TEXT NOT NULL,
    "id_item_combo" TEXT NOT NULL,
    "id_item_product" TEXT NOT NULL,

    CONSTRAINT "ItemsCombo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemsCombo" ADD CONSTRAINT "ItemsCombo_id_item_combo_fkey" FOREIGN KEY ("id_item_combo") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsCombo" ADD CONSTRAINT "ItemsCombo_id_item_product_fkey" FOREIGN KEY ("id_item_product") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
