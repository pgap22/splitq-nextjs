/*
  Warnings:

  - You are about to drop the column `id_category` on the `Items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Items" DROP COLUMN "id_category";

-- CreateTable
CREATE TABLE "ItemCategory" (
    "id" TEXT NOT NULL,
    "id_items" TEXT NOT NULL,
    "id_category" TEXT NOT NULL,

    CONSTRAINT "ItemCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemCategory" ADD CONSTRAINT "ItemCategory_id_items_fkey" FOREIGN KEY ("id_items") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCategory" ADD CONSTRAINT "ItemCategory_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
