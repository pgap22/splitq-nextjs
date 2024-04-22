-- AlterTable
ALTER TABLE "UserRefoundBalance" ADD COLUMN     "id_mod" TEXT;

-- AddForeignKey
ALTER TABLE "UserRefoundBalance" ADD CONSTRAINT "UserRefoundBalance_id_mod_fkey" FOREIGN KEY ("id_mod") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
