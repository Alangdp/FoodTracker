import { z } from "zod";

export type UserProps = {
  id: string,
  name: string,
  email: string, 
  password: string,
  permission_add: boolean,       
  permission_edit: boolean,           
  permission_delete: boolean,         
  permission_update: boolean,         
  permission_updateStatus: boolean,   
  permission_deleteOrder: boolean,    
  permission_add_new_worker: boolean,   
  companyId: string,
}

export const UserFilterSchema = z.object({
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
});