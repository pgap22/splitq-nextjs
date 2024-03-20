-- CreateEnum
CREATE TYPE "LogsType" AS ENUM ('recharge', 'shop', 'refound', 'reclaim');

-- CreateTable
CREATE TABLE "Logs" (
    "id" TEXT NOT NULL,
    "type" "LogsType" NOT NULL,
    "productID" TEXT,
    "userID" TEXT NOT NULL,
    "price" TEXT,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
