import { z } from "zod";

export const SignupSchema = z.object({
    email: z.string({required_error: "Email is required"}).email(),
    password: z.string().min(8),
})
/* 2nd (planned) step in signup form 
!! Fields are subject to change
*/
export const ProfileSchema = z.object({
    firstname: z.string({required_error: "First name is required"}).min(3),
    lastname: z.string({required_error: "Last name is required"}).min(3),
    username: z.string().optional(),
    age: z.number({required_error: "Age is required"}).min(18, "You must be 18 or older to sign up.").optional(),
})

/* 3rd (planned) step in signup form. 
!! Fields are subject to change */
export const RestaurantProfileSchema = z.object({
    name: z.string({required_error: "Name is required"}).min(3),
    address: z.string({required_error: "Address is required"}).min(3),
    description: z.string().optional(),
    phone: z.string({required_error: "Phone number is required"}).min(10),
    email: z.string({required_error: "Email is required"}).email(),
    website: z.string().optional(),
    openingHours: z.string().optional(),
    closingHours: z.object({
        /* todo: define later */
    }).optional(),
})