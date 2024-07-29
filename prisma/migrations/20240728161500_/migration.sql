-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdersProducts" (
    "id" TEXT NOT NULL,
    "id_order" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrdersProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersProducts" ADD CONSTRAINT "OrdersProducts_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
