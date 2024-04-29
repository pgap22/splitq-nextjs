/*
  Warnings:

  - Added the required column `id_combo` to the `ComboProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ComboProducts" ADD COLUMN     "id_combo" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Combo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "id_seller" TEXT NOT NULL,

    CONSTRAINT "Combo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Combo" ADD CONSTRAINT "Combo_id_seller_fkey" FOREIGN KEY ("id_seller") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComboProducts" ADD CONSTRAINT "ComboProducts_id_combo_fkey" FOREIGN KEY ("id_combo") REFERENCES "Combo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
