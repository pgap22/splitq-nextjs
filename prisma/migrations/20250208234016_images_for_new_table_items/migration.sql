-- CreateTable
CREATE TABLE "ItemImages" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "public_id" TEXT NOT NULL DEFAULT '',
    "id_item" TEXT NOT NULL,

    CONSTRAINT "ItemImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemImages" ADD CONSTRAINT "ItemImages_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
