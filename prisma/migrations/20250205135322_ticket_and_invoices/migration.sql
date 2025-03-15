/*
  Warnings:

  - The values [IN_CART_DISABLED,IN_CART_ENABLED] on the enum `TicketStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrdersProducts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_product` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TicketStatus_new" AS ENUM ('TICKET_ENABLED', 'REDEEMED', 'REFOUND_REQUST', 'REFOUNDED');
ALTER TABLE "Tickets" ALTER COLUMN "ticket_status" DROP DEFAULT;
ALTER TABLE "Tickets" ALTER COLUMN "ticket_status" TYPE "TicketStatus_new" USING ("ticket_status"::text::"TicketStatus_new");
ALTER TYPE "TicketStatus" RENAME TO "TicketStatus_old";
ALTER TYPE "TicketStatus_new" RENAME TO "TicketStatus";
DROP TYPE "TicketStatus_old";
ALTER TABLE "Tickets" ALTER COLUMN "ticket_status" SET DEFAULT 'TICKET_ENABLED';
COMMIT;

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_id_user_fkey";

-- DropForeignKey
ALTER TABLE "OrdersProducts" DROP CONSTRAINT "OrdersProducts_id_order_fkey";

-- AlterTable
ALTER TABLE "Tickets" ADD COLUMN     "id_product" TEXT NOT NULL,
ALTER COLUMN "ticket_status" SET DEFAULT 'TICKET_ENABLED';

-- DropTable
DROP TABLE "Orders";

-- DropTable
DROP TABLE "OrdersProducts";

-- CreateTable
CREATE TABLE "Invoices" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoicesProducts" (
    "id" TEXT NOT NULL,
    "id_invoice" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "InvoicesProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoicesProducts" ADD CONSTRAINT "InvoicesProducts_id_invoice_fkey" FOREIGN KEY ("id_invoice") REFERENCES "Invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
