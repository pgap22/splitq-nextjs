/*
  Warnings:

  - You are about to drop the column `id_combo` on the `ComboProducts` table. All the data in the column will be lost.
  - You are about to drop the `Combo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Combo" DROP CONSTRAINT "Combo_id_seller_fkey";

-- DropForeignKey
ALTER TABLE "ComboProducts" DROP CONSTRAINT "ComboProducts_id_combo_fkey";

-- AlterTable
ALTER TABLE "ComboProducts" DROP COLUMN "id_combo";

-- DropTable
DROP TABLE "Combo";
