-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "code" TEXT,
ADD COLUMN     "verification" BOOLEAN NOT NULL DEFAULT false;
