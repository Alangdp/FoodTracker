import { z } from "zod";

export const ImageFilterSchema = z.object({
  id: z.string().optional(),
  imageUrl: z.string(),
  productId: z.string(),
  status: z.boolean().optional().default(true)
}); 

export type ImageProps = z.infer<typeof ImageFilterSchema>;
