-- CreateTable
CREATE TABLE "Tickets" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_product" TEXT,
    "id_combo" TEXT,
    "ticket_redeem" BOOLEAN NOT NULL DEFAULT false,
    "claimedAt" TIMESTAMP(3),
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_id_combo_fkey" FOREIGN KEY ("id_combo") REFERENCES "Combo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
