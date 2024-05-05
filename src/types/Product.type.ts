import { z } from 'zod';

export const ProductFilterSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  description: z.string().or(z.null()),
  value: z.number().positive(),
  discountPercent: z.number().nonnegative().lte(100),
  status: z.boolean().default(true),
  companyId: z.string().uuid(),
});

export type ProductProps = z.infer<typeof ProductFilterSchema>;
