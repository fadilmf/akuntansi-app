import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    console.log("ini data ", data);

    if (
      !data.customer ||
      !data.quoteNumber ||
      !data.date ||
      !data.customerReference ||
      !data.termOfPayment
    ) {
      return NextResponse.json(
        { message: "Semua field yang diperlukan harus diisi" },
        { status: 400 }
      );
    }

    const penawaranHarga = await prisma.priceQuote.create({
      data: {
        customer: data.customer,
        quoteNumber: data.quoteNumber,
        date: new Date(data.date),
        customerReference: data.customerReference,
        termOfPayment: data.termOfPayment,
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

    return NextResponse.json(penawaranHarga, { status: 201 });
  } catch (error) {
    console.error("Error creating penjualan:", error);
    return NextResponse.json(
      { message: "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const penawaranHarga = await prisma.priceQuote.findMany();
    return NextResponse.json(penawaranHarga, { status: 201 });
    // NextResponse.json(
    //   { message: "Semua field yang diperlukan harus diisi" },
    //   { status: 400 }
    // );
  } catch (error) {
    console.error("Error fetching data: ", error);
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
