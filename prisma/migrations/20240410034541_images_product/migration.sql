-- DropEnum
DROP TYPE "LogsType";

-- CreateTable
CREATE TABLE "ProductImages" (
    "id" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
