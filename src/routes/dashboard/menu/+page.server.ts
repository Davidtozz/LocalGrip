import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { menuItemSchema } from "$lib/formSchemas";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms";

// @ts-expect-error - required for typechecking
export const load: PageServerLoad = async ({locals}) => {
  return {
    form: await superValidate(zod(menuItemSchema)),
    user: locals.user
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

    return {
      success: true,
      form,
    };
  },
};
