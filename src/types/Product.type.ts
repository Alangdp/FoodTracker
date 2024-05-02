import { z } from 'zod';

export const ProductFilterSchema = z.object({
  id: z.string().optional(),
  category: z.string(),
  title: z.string(),
  description: z.string(),
  images: z.array(z.object({
    id: z.string().optional(),
    imageUrl: z.string(),
    productId: z.string(),
    status: z.boolean().optional().default(true),
  })),
  value: z.number(),
  discountPercent: z.number(),
  companyId: z.string().optional()
});

export type ProductProps = z.infer<typeof ProductFilterSchema>;
