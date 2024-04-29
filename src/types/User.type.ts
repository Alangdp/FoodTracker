import { z } from "zod";

export type UserProps = z.infer<typeof UserFilterSchema>;

export const UserFilterSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Name must be a min 3 length"),
  email: z
    .string()
    .email({ message: "Email is not valid" })
    .trim()
    .min(4)
    .toLowerCase(),
  password: z.string().trim().min(8, "Password must be a min 8 length"),
  companyId: z.string(),
  permission_add: z.boolean().optional(),       
  permission_edit: z.boolean().optional(),           
  permission_delete: z.boolean().optional(),         
  permission_update: z.boolean().optional(),         
  permission_updateStatus: z.boolean().optional(),   
  permission_deleteOrder: z.boolean().optional(),    
  permission_add_new_worker: z.boolean().optional(),  
  createdAt: z.date().optional(),
});