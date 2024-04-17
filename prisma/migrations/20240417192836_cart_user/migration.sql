-- CreateTable
CREATE TABLE "CartUserProducts" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,

    CONSTRAINT "CartUserProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartUserProducts" ADD CONSTRAINT "CartUserProducts_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartUserProducts" ADD CONSTRAINT "CartUserProducts_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
