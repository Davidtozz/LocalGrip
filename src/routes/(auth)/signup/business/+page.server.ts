import { RestaurantProfileSchema } from "$lib/FormSchemas";
import { fail, error as PageError, type Actions } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const actions: Actions = {
    default: async ({locals, request}) => {
        const { error: sbError } = await locals.supabase.auth.getUser();
        if(sbError) {
            throw PageError(401, {
                message: "You must be logged in to view this page."
            });
        }

        console.log("User is logged in: ", (sbError === null))

        const form = await superValidate(request, zod(RestaurantProfileSchema))

        console.log("Form is valid: ", form.valid, "\nData: ", JSON.stringify(form.data))

        if(!form.valid) {
            return fail(400, {
                form
            })
        }

        const { name, address, phone, website} = form.data;

        const {error} = await locals.supabase.rpc('create_restaurant_profile', {
            name, 
            address,
            phone, 
            website
        })   
        
        if(error) {
            
            console.log("Error creating restaurant profile: ", JSON.stringify(error))
            
            return PageError(500, {
                message: "Error creating restaurant profile"
            })
        }
        
        return { form }
    }
};