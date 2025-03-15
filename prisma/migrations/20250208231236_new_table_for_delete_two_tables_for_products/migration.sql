-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "item_type" "TicketProductType" NOT NULL,
    "description" TEXT,
    "id_category" TEXT NOT NULL,
    "id_seller" TEXT NOT NULL,
    "id_item_combo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_id_item_combo_fkey" FOREIGN KEY ("id_item_combo") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
