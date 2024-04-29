import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// Instanciar o cliente Prisma
const prisma = new PrismaClient();

// Definir o esquema de validação para o objeto Product
export const ProductFilterSchema = z.object({
  id: z.string().optional(),
  category: z.string(),
  title: z.string(),
  description: z.string(),
  images: z.array(z.object({
    id: z.string().optional(),
    imageUrl: z.string(),
    productId: z.string(),
  })),
  value: z.number(),
  discountPercent: z.number(),
});

export type ProductProps = z.infer<typeof ProductFilterSchema>;
