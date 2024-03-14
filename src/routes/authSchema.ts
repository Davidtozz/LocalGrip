import { z } from 'zod';

export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().trim().min(8).superRefine((password, ctx) => {

        const hasUppercase = /[A-Z]/.test(password);
        if(!hasUppercase) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Password must contain at least one uppercase letter'
            })
        }
        const hasLowercase: boolean = /[a-z]/.test(password);
        if(!hasLowercase) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Password must contain at least one lowercase letter'
            })
        }
        const hasNumber: boolean = /[0-9]/.test(password);
        if(!hasNumber) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Password must contain at least one number'
            })
        }
        const hasSpecialChar: boolean = /\W/.test(password);
        if(!hasSpecialChar) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Password must contain at least one special character'
            })
        }
    })
})

export type AuthSchema = typeof authSchema;