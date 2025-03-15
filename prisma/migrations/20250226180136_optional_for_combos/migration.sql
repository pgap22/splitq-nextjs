-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_id_category_fkey";

-- AlterTable
ALTER TABLE "Items" ALTER COLUMN "id_category" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
