/*
  Warnings:

  - You are about to drop the column `image` on the `Products` table. All the data in the column will be lost.
  - Added the required column `id_seller` to the `Combo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Combo" ADD COLUMN     "id_seller" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "image";

-- AddForeignKey
ALTER TABLE "Combo" ADD CONSTRAINT "Combo_id_seller_fkey" FOREIGN KEY ("id_seller") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
