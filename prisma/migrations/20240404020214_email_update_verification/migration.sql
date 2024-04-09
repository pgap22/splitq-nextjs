-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "emailToken" TEXT;

-- CreateTable
CREATE TABLE "Combo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Combo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComboProducts" (
    "id" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "id_combo" TEXT NOT NULL,

    CONSTRAINT "ComboProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ComboProducts" ADD CONSTRAINT "ComboProducts_id_combo_fkey" FOREIGN KEY ("id_combo") REFERENCES "Combo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComboProducts" ADD CONSTRAINT "ComboProducts_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
