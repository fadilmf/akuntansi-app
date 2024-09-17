"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/prisma";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const accountRole = await currentRole();

  if (accountRole !== UserRole.ADMIN) {
    return { error: "Forbidden!" };
  }

  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, role } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const userRole = role === "ADMIN" ? UserRole.ADMIN : UserRole.USER;

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: userRole,
    },
  });

  // TODO: send verification token email

  return { success: "User created!" };
};
