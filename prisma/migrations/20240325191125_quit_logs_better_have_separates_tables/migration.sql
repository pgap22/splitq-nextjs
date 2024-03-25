/*
  Warnings:

  - You are about to drop the `Logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Logs" DROP CONSTRAINT "Logs_userID_fkey";

-- DropTable
DROP TABLE "Logs";

-- CreateTable
CREATE TABLE "Recharges" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "userID" TEXT NOT NULL,
    "modID" TEXT NOT NULL,

    CONSTRAINT "Recharges_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recharges" ADD CONSTRAINT "Recharges_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recharges" ADD CONSTRAINT "Recharges_modID_fkey" FOREIGN KEY ("modID") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
