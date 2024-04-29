/*
  Warnings:

  - You are about to drop the column `enable` on the `CartUserProducts` table. All the data in the column will be lost.
  - You are about to drop the column `ticketRedeem` on the `CartUserProducts` table. All the data in the column will be lost.
  - Made the column `ticket_qr` on table `CartUserProducts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CartUserProducts" DROP COLUMN "enable",
DROP COLUMN "ticketRedeem",
ADD COLUMN     "enableToBuy" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "ticket_enabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ticket_redeem" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "ticket_qr" SET NOT NULL;
