import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany(); // Fetch products from the database
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    console.log("ini data ", data);

    if (!data.name || !data.category || !data.unit) {
      return NextResponse.json(
        { message: "Semua field yang diperlukan harus diisi" },
        { status: 400 }
      );
    }

    const products = await prisma.product.create({
      data,
    });

    return NextResponse.json(products, { status: 201 });
  } catch (error) {
    console.error("Error creating products:", error);
    return NextResponse.json(
      { message: "Gagal menyimpan produk" },
      { status: 500 }
    );
  }
}
