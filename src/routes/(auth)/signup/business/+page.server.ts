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

        const form = await superValidate(request, zod(RestaurantProfileSchema))

        if(!form.valid) {
            return fail(400, {
                form
            })
        }

        
        const { name, address, phone, website} = form.data;

        const { error } = await locals.supabase.from('restaurant').insert({
            name: name,
            address: address,
            phone: phone,
            website_url: website,
            owner_id: locals.user?.id
        })

        if(error) throw PageError(500, {
            message: "Error creating restaurant profile"
        })


        return { form }
    }
};