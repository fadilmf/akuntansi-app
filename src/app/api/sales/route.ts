import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (
      !data.invoiceNumber ||
      !data.date ||
      !data.salesOrderNumber ||
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

    const penjualan = await prisma.sales.create({
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
        // productList: {
        //   create: data.produkList.map((produk: any) => ({
        //     name: produk.produk,
        //     deskripsi: produk.deskripsi,
        //     qty: produk.qty,
        //     satuan: produk.satuan,
        //     harga: produk.harga,
        //     total: produk.qty * produk.harga,
        //   })),
        // },
      },
    });

    return NextResponse.json(penjualan, { status: 201 });
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
    const penjualan = await prisma.sales.findMany();
    return NextResponse.json(penjualan, { status: 201 });
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
