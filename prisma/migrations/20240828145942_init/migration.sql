-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "unit" TEXT,
    "stock" INTEGER,
    "status" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" SERIAL NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "salesOrderNumber" TEXT NOT NULL,
    "deliveryNumber" TEXT NOT NULL,
    "poNumber" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "customer" TEXT NOT NULL,
    "termOfPayment" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "notes" TEXT,
    "amount" INTEGER,
    "bill" INTEGER,
    "status" TEXT,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToSales" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSales_AB_unique" ON "_ProductToSales"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSales_B_index" ON "_ProductToSales"("B");

-- AddForeignKey
ALTER TABLE "_ProductToSales" ADD CONSTRAINT "_ProductToSales_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSales" ADD CONSTRAINT "_ProductToSales_B_fkey" FOREIGN KEY ("B") REFERENCES "Sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
