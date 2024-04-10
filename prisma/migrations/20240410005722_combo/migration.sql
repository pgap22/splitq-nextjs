/*
  Warnings:

  - Added the required column `price` to the `ComboProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ComboProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_id` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ComboProducts" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "seller_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
