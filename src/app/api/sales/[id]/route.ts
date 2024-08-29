import prisma from "@/lib/prisma";
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

    const sale = await prisma.sales.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!sale) {
      return NextResponse.json(
        { error: "Sales data not found" },
        { status: 404 }
      );
    }

    // Return the sale data as JSON response
    return NextResponse.json(sale, { status: 200 });
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
    const existingSale = await prisma.sales.findUnique({ where: { id } });

    if (!existingSale) {
      return NextResponse.json(
        { error: "Sales data not found" },
        { status: 404 }
      );
    }

    const data = await req.json();

    // Update the sales data
    const updatedSale = await prisma.sales.update({
      where: { id },
      data: {
        ...data,
        // productList: data.productList,
      },
    });

    return NextResponse.json(updatedSale, { status: 200 });
  } catch (error) {
    console.error("Error updating sales data: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
