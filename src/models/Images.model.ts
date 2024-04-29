import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteByProductId(id: string) {
  return await prisma.image.deleteMany({where: { productId: id}});
}