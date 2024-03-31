import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { menuItemSchema } from "$lib/FormSchemas";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms";
import type { Tables } from "$db/schema";

// @ts-expect-error - required for typechecking
export const load: PageServerLoad = async ({locals}) => {

  console.log('ran load of /dashboard/menu');

  const {data, error} = await locals.supabase.from('menu_item').select().returns<Tables<'menu_item'>[]>();

  if(error) return fail(500, {message: "Internal server error"})

  return {
    form: await superValidate(zod(menuItemSchema)),
    data
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(menuItemSchema));

    if (!form.valid) {
      return fail(400, {
        errors: form.errors,
        success: false,
      });
    }

    const { error } = await event.locals.supabase.from('menu_item').insert({
      name: form.data.name,
      description: form.data.description,
      price: form.data.price,
      category: form.data.category
    }).single();



    if(error) {
      return fail(500, {
        message: "Internal server error",
        form
      });
    }

    return {
      success: true,
      form
    };
  },
};
