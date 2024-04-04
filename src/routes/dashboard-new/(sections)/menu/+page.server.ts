import { superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { MenuItemSchema } from "$lib/FormSchemas";
import { error, fail } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import type { z } from "zod";

//@ts-expect-error ts is dumb
export const load: PageServerLoad = async ({locals}) => {
    const form = await superValidate(zod(MenuItemSchema))

    const result = await locals.supabase.from("menu").select(`
        id,
        name, 
        category,
        ingredients, 
        price
    `).returns<z.infer<typeof MenuItemSchema>[]>()
    
    /* Not working: user not authenticated on /dashboard-new */

    if(result.error) {
        console.log("Error fetching menu items: ", result.error)
        return error(500, {
            message: "Internal Server Error"
        })
    }

    const {data} = result;

    return { form, data }
};

export const actions: Actions = {
    newItem: async ({locals, request}) => {
        const form = await superValidate(request, zod(MenuItemSchema))
        if(!form.valid) {
            console.log("Form is invalid: ", JSON.stringify(form))
            return fail(400, {
                form
            })
        }

        const { name, ingredients, price, category } = form.data

        const { error: sbError } = await locals.supabase.from("menu_item").insert({
            name,
            ingredients,
            price,
            category
        })

        if(sbError) {
            console.log("Error creating menu item: ", JSON.stringify(sbError))

            return error(500, {
            message: "Internal Server Error"
        })}

        return { form }
    },
    editItem: async ({locals, request}) => {
        const form = await superValidate(request, zod(MenuItemSchema))
        if(!form.valid) {
            console.log("Form is invalid: ", JSON.stringify(form))
            return fail(400, {
                form
            })
        }

        const { id, name, ingredients, price, category } = form.data

        const { error: sbError } = await locals.supabase.from("menu").update({
            name,
            ingredients,
            price,
            category
        })
        .eq("id", id)

        if(sbError) {
            console.log("Error updating menu item: ", JSON.stringify(sbError))

            return error(500, {
            message: "Internal Server Error"
        })}

        return { form }
    }

};