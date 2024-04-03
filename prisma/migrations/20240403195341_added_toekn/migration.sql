/*
  Warnings:

  - You are about to drop the column `code` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `verification` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "code",
DROP COLUMN "verification",
ADD COLUMN     "token" TEXT;
