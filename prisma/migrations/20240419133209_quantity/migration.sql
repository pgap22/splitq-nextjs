/*
  Warnings:

  - Added the required column `quantity` to the `CartUserProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartUserProducts" ADD COLUMN     "quantity" INTEGER NOT NULL;
