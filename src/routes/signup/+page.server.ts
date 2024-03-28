import { superValidate, withFiles } from "sveltekit-superforms/server";
import type { Actions } from "../$types";
import { SignupSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "sveltekit-superforms";

export const actions: Actions = {
    default: async ({request, locals}) => {
        const form = await superValidate(request, zod(SignupSchema));
    

        if(!form.valid) {
            return fail(400, {
                form
            })
        }

        const { email, password } = form.data
        
        const { error } = await locals.supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    avatarUrl: ""
                }
            }
        })

        if(error) {
            return fail(400, {
                error,
                form
            })
        }

        return withFiles({form})
    }
 /* ownerProfile: async ({request, locals}) => {
        
    } */
};