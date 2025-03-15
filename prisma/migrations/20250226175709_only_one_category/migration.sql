/*
  Warnings:

  - You are about to drop the `ItemCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_category` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ItemCategory" DROP CONSTRAINT "ItemCategory_id_category_fkey";

-- DropForeignKey
ALTER TABLE "ItemCategory" DROP CONSTRAINT "ItemCategory_id_items_fkey";

-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "id_category" TEXT NOT NULL;

-- DropTable
DROP TABLE "ItemCategory";

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
