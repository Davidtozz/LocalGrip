import { z } from "zod";
/* import { passwordStrength } from "check-password-strength"; */
export const MenuItemSchema = z.object({
  name: z.string().min(3).max(30),
  description: z.string().min(3).max(100),
  price: z.coerce.number().min(0.01),
  category: z.string().min(3).max(30),
  subcategory: z.string().min(3).max(30).optional(),
});

export const SignupSchema = z.object({
    email: z.string({required_error: "Email is required"}).email(),
    firstname: z.string({required_error: "First name is required"}).min(3),
    lastname: z.string({required_error: "Last name is required"}).min(3),
    password: z.string()/* .trim() */.min(8)/* .superRefine((password, ctx) => {
      let level = passwordStrength(password)

      

    }) */,
    isBusinessOwner: z.boolean().default(false),
})

export const SigninSchema = z.object({
  email: z.string({required_error: "Email is required"}).email(),
  password: z.string({required_error: "Password is required"}).min(8),
})

/* 2nd (planned) step in signup form 
!! Fields are subject to change
*/
export const ProfileSchema = z.object({
    firstname: z.string({required_error: "First name is required"}).min(3),
    lastname: z.string({required_error: "Last name is required"}).min(3),
    age: z.number({required_error: "Age is required", coerce: true}).min(18, "You must be 18 or older to sign up.").optional(),
})

/* 3rd (planned) step in signup form. 
!! Fields are subject to change */
export const RestaurantProfileSchema = z.object({
    name: z.string({required_error: "Name is required"}).min(3),
    address: z.string({required_error: "Address is required"}).min(3),
    bio: z.string().optional(),
    phone: z.string({required_error: "Phone number is required"}).min(10),
    email: z.string({required_error: "Email is required"}).email().optional(),
    website: z.string().optional(),
    openingHours: z.string().optional(),
    closingHours: z.object({
      /* todo: define later */
    }).optional(),
})