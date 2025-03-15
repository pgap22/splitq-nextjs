/*
  Warnings:

  - You are about to drop the column `id_combo` on the `Tickets` table. All the data in the column will be lost.
  - You are about to drop the column `id_product` on the `Tickets` table. All the data in the column will be lost.
  - Added the required column `price` to the `Tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `Tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_type` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TicketProductType" AS ENUM ('PRODUCT', 'COMBO');

-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_id_combo_fkey";

-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_id_product_fkey";

-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "id_combo",
DROP COLUMN "id_product",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "product_name" TEXT NOT NULL,
ADD COLUMN     "product_type" "TicketProductType" NOT NULL,
ADD COLUMN     "refunded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "refundedAt" TIMESTAMP(3),
ADD COLUMN     "request_refund" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TicketsItem" (
    "id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "producto_quantity" TEXT NOT NULL,
    "id_ticket" TEXT NOT NULL,

    CONSTRAINT "TicketsItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketsItem" ADD CONSTRAINT "TicketsItem_id_ticket_fkey" FOREIGN KEY ("id_ticket") REFERENCES "Tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
