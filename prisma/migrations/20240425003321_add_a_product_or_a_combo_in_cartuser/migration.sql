/*
  Warnings:

  - Added the required column `id_combo` to the `CartUserProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartUserProducts" ADD COLUMN     "id_combo" TEXT NOT NULL,
ALTER COLUMN "id_product" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CartUserProducts" ADD CONSTRAINT "CartUserProducts_id_combo_fkey" FOREIGN KEY ("id_combo") REFERENCES "Combo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
