import prisma from "@/lib/prisma";
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

    const product = await prisma.product.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product data not found" },
        { status: 404 }
      );
    }

    // Return the product data as JSON response
    return NextResponse.json(product, { status: 200 });
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
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Sales data not found" },
        { status: 404 }
      );
    }

    const data = await req.json();

    // Update the product data
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: data.form,
    });
    return NextResponse.json({ updatedProduct }, { status: 200 });
  } catch (error) {
    console.error("Error updating sales data: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
