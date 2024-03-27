import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30).optional(),
  password: z
    .string()
    .trim()
    .min(8)
    .superRefine((password, ctx) => {
      const hasUppercase = /[A-Z]/.test(password);
      if (!hasUppercase) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must contain at least one uppercase letter",
        });
      }
      const hasLowercase: boolean = /[a-z]/.test(password);
      if (!hasLowercase) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must contain at least one lowercase letter",
        });
      }
      const hasNumber: boolean = /[0-9]/.test(password);
      if (!hasNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must contain at least one number",
        });
      }
      const hasSpecialChar: boolean = /\W/.test(password);
      if (!hasSpecialChar) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must contain at least one special character",
        });
      }
    }),
  isLocalOwner: z.boolean().default(true),
  avatar: z.any().optional(), /* todo: chamnge later */
});
export type AuthSchema = typeof authSchema;

export const menuItemSchema = z.object({
  name: z.string().min(3).max(30),
  description: z.string().min(3).max(100),
  price: z.coerce.number().min(0.01),
  category: z.string().min(3).max(30),
  subcategory: z.string().min(3).max(30).optional(),
});

export type MenuItemSchema = typeof menuItemSchema;
