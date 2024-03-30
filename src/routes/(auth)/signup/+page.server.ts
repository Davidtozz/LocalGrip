import { superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";
import { SignupSchema } from "$lib/FormSchemas";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";

//@ts-expect-error ts is dumb 
export const load: PageServerLoad = async () => {
    const form = await superValidate(zod(SignupSchema))

    const {data} = form
        
    return { form: data }
};

export const actions: Actions = { 
    default: async ({request, locals}) => {
        const form = await superValidate(request, zod(SignupSchema));
    

        if(!form.valid) {
            return fail(400, {
                form
            })
        }

        const { firstname, lastname, email, password, isBusinessOwner } = form.data
        
        const { data, error } = await locals.supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    firstname, 
                    lastname,
                    avatarUrl: "",
                    isBusinessOwner
                }
            }
        })



        if(error) {
            console.log("There was an error: ", error.message)
            return fail(400, {
                error,
                form
            })
        }

        console.log("User created successfully!")

        return { data, form }
    }
 /* ownerProfile: async ({request, locals}) => {
        
    } */
};