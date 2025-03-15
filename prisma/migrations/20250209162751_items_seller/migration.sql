-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_id_seller_fkey" FOREIGN KEY ("id_seller") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
