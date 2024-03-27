import { fail, type Actions } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { authSchema } from "../lib/formSchemas";
import { zod } from "sveltekit-superforms/adapters";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.getSession();

  return {
    session,
  };
};

export const actions: Actions = {
  //? Default actions are not allowed when named actions are present
  signUp: async (event) => {
    const form = await superValidate(event, zod(authSchema));
    if (!form.valid) {
      return fail(400, {
        message: "Invalid form",
      });
    }

    const { email, username, password, isLocalOwner } = form.data;
    if (!email)
      return fail(400, {
        message: "Email is required for signing up",
        form,
      });

    const { data, error } = await event.locals.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          isLocalOwner: isLocalOwner,
        },
      },
    });



    const {error: sbError} = await event.locals.supabase.storage.from('image_bucket').upload(`${data.user?.id}/avatar.png`, form.data.avatar)


    if (error || sbError)
      return fail(500, {
        message: "Couldn't signup",
        form,
      });

    return {
      success: true,
      form,
    };
  },
  signIn: async (event) => {
    const form = await superValidate(event, zod(authSchema));

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const { email, password } = form.data;

    const { error, data } = await event.locals.supabase.auth.signInWithPassword(
      {
        email,
        password,
      },
    );

    if (error)
      return fail(500, {
        message: "Couldn't signin",
        form
      });

    return {
      success: true,
      data,
      form
    };
  },
  signOut: async (event) => {
    const { error } = await event.locals.supabase.auth.signOut();
    if (error)
      return fail(500, {
        message: "Couldn't sign out",
      });
    return {
      success: true,
    };
  },
};
