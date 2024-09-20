import prisma from "@/lib/prisma";
import { SalesProduct } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    console.log("ini data sales order: ", data);

    if (
      !data.salesOrderNumber ||
      !data.date ||
      !data.deliveryNumber ||
      !data.customer ||
      !data.poNumber ||
      !data.termOfPayment
    ) {
      return NextResponse.json(
        { message: "Semua field yang diperlukan harus diisi" },
        { status: 400 }
      );
    }

    const salesOrder = await prisma.salesOrder.create({
      data: {
        salesOrderNumber: data.salesOrderNumber,
        date: new Date(data.date),
        deliveryNumber: data.deliveryNumber,
        customer: data.customer,
        poNumber: data.poNumber,
        termOfPayment: data.termOfPayment,
        invoiceReceived: data.invoiceReceived,
        subject: data.subject,
        notes: data.notes,
        amount: data.amount,
        products: {
          create: data.productList.map((product: any) => ({
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

    return NextResponse.json(salesOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating sales order:", error);
    return NextResponse.json(
      { message: "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const salesOrder = await prisma.salesOrder.findMany();
    return NextResponse.json(salesOrder, { status: 201 });
  } catch (error) {
    console.error("Error fetching data: ", error);
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
