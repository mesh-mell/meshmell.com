import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function prismaMain() {
  try {
    await prisma.$connect();
  } catch (error: any) {
    console.error(error);

    return Error("failed to connect to database");
  }
}
