import { type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { menuItemSchema } from "$lib/formSchemas";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms";

// @ts-expect-error - required for typechecking
export const load: PageServerLoad = async () => {
   
    return {
        form: await superValidate(zod(menuItemSchema))
    }
};



export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(menuItemSchema));

        if(!form.valid) {
            return {
                message: "Invalid form",
                form
            }
        }

        return {
            success: true,
            form
        }
    }
};