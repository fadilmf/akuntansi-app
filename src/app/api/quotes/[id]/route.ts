import prisma from "@/lib/prisma";
import { SalesProduct } from "@/types/types";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const priceQuote = await prisma.priceQuote.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        products: true,
      },
    });

    if (!priceQuote) {
      return NextResponse.json(
        { error: "Sales data not found" },
        { status: 404 }
      );
    }

    // Return the sale data as JSON response
    return NextResponse.json(priceQuote, { status: 200 });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    // Check if the sales data exists
    const existingSale = await prisma.sale.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!existingSale) {
      return NextResponse.json(
        { error: "Sales data not found" },
        { status: 404 }
      );
    }

    const data = await req.json();

    if (!Array.isArray(data.productList) || data.productList.length === 0) {
      return NextResponse.json(
        { error: "No products data provided" },
        { status: 400 }
      );
    }

    const productIds = data.productList.map(
      (product: SalesProduct) => product.productId
    );
    const uniqueProductIds = new Set(productIds);

    if (uniqueProductIds.size !== productIds.length) {
      return NextResponse.json(
        { error: "Produk yang sama tidak boleh dipilih lebih dari sekali." },
        { status: 400 }
      );
    }

    // Update the sales data
    const updatedSale = await prisma.sale.update({
      where: { id },
      data: {
        invoiceNumber: data.invoiceNumber,
        date: new Date(data.date),
        salesOrderNumber: data.salesOrderNumber,
        deliveryNumber: data.deliveryNumber,
        customer: data.customer,
        poNumber: data.poNumber,
        termOfPayment: data.termOfPayment,
        subject: data.subject,
        notes: data.notes,
        amount: data.amount,
        products: {
          deleteMany: {},
          create: data.productList.map((product: SalesProduct) => ({
            productId: product.productId,
            description: product.description,
            quantity: product.quantity,
            unit: product.unit,
            price: product.price,
            total: product.total,
          })),
        },
      },
    });

    // Pastikan `salesId` ada pada produk pertama
    // const salesId = data.products[0].salesId;
    // if (!salesId) {
    //   return NextResponse.json(
    //     { error: "Sales ID is missing in the provided data." },
    //     { status: 400 }
    //   );
    // }

    // Hapus semua produk terkait salesId sebelum menambah produk yang baru
    // await prisma.salesProduct.deleteMany({
    //   where: { salesId: salesId },
    // });

    // Tambahkan produk baru terkait salesId
    // const updatedProducts = await prisma.salesProduct.createMany({
    //   data: data.products.map((product: any) => ({
    //     salesId: salesId,
    //     productId: product.productId,
    //     description: product.description,
    //     quantity: product.quantity,
    //     unit: product.unit,
    //     price: product.price,
    //     total: product.total,
    //   })),
    // });

    return NextResponse.json({ updatedSale }, { status: 200 });
  } catch (error) {
    console.error("Error updating sales data: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
