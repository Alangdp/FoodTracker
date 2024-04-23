import { z } from "zod";

const phoneRegex = /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/gm;

export type CompanyProps = {
  id: string
  name: string
  email: string
  contact: string
  password: string
}

export const CompanyFilterSchema = z.object({
  name: z.string().min(3, "Name must be a min 3 length"),
  email: z
    .string()
    .email({ message: "Email is not valid" })
    .trim()
    .min(4)
    .toLowerCase(),
  contact: z.string().regex(phoneRegex, "Invalid Phone Number"),
  password: z.string().trim().min(8, "Password must be a min 8 length"),
});

export const CompanyFilterSchemaPartial = z.object({
  name: z.string().min(3, "Name must be a min 3 length"),
  email: z
    .string()
    .email({ message: "Email is not valid" })
    .trim()
    .min(4)
    .toLowerCase(),
  contact: z.string().regex(phoneRegex, "Invalid Phone Number"),
  password: z.string().trim().min(8, "Password must be a min 8 length"),
}).partial();