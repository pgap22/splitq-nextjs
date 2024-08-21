-- CreateTable
CREATE TABLE "SplitPay" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "id_user" TEXT,

    CONSTRAINT "SplitPay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SplitPay" ADD CONSTRAINT "SplitPay_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
