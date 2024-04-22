-- CreateEnum
CREATE TYPE "UserRefoundStatus" AS ENUM ('pending', 'accepted', 'denied');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "freezebalance" DOUBLE PRECISION DEFAULT 0.00;

-- CreateTable
CREATE TABLE "UserRefoundBalance" (
    "id" TEXT NOT NULL,
    "status" "UserRefoundStatus" NOT NULL DEFAULT 'pending',
    "refoundBalance" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "UserRefoundBalance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRefoundBalance" ADD CONSTRAINT "UserRefoundBalance_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
