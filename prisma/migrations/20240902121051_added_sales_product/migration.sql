/*
  Warnings:

  - You are about to drop the `_ProductToSales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductToSales" DROP CONSTRAINT "_ProductToSales_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSales" DROP CONSTRAINT "_ProductToSales_B_fkey";

-- DropTable
DROP TABLE "_ProductToSales";

-- CreateTable
CREATE TABLE "SalesProduct" (
    "id" SERIAL NOT NULL,
    "salesId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT,
    "price" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "SalesProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SalesProduct_salesId_productId_key" ON "SalesProduct"("salesId", "productId");

-- AddForeignKey
ALTER TABLE "SalesProduct" ADD CONSTRAINT "SalesProduct_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "Sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesProduct" ADD CONSTRAINT "SalesProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
