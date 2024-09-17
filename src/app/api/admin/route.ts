import { currentRole } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  try {
    // Mengambil daftar semua pengguna dari database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        // isActive: true,
        image: true,
      },
    });

    // Mengembalikan daftar pengguna sebagai response JSON
    return NextResponse.json(users);
  } catch (error) {
    // Menangani error dan mengembalikan response error
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
