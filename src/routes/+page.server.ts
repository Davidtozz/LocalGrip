import { fail, type Actions } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";
import { superValidate } from "sveltekit-superforms";
import { authSchema } from "../lib/authSchema";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    
    const session = await event.locals.getSession();
    
    return {
        session    
    }
};

export const actions: Actions = {
    //? Default actions are not allowed when named actions are present
    signUp: async (event) => {
        
        const form = await superValidate(event, zod(authSchema));
        if(!form.valid) {
            return fail(400, {
                message: "Invalid form",
            });
        }


        const {email, password} = form.data;

        const {error} = await supabase.auth.signUp({
            email,
            password
        });

        if(error) return fail(500, {
            message: "Couldn't signup: " +error.message
        })

        return {
            success: true
        };
    },
    signIn: async (event) => {
        const form = await superValidate(event, zod(authSchema));

        if(!form.valid) {
            return fail(400, {
                form
            });
        }

        const {email, password} = form.data;

        const {error, data} = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if(error) return fail(500, {
            message: "Couldn't signin: " + error.message
        });

        return {
            success: true,
            data
        };
    },
    signOut: async () => {
        const {error} = await supabase.auth.signOut();
        if(error) return fail(500, {
            message: "Couldn't signout: " + error.message
        });
        return {
            success: true
        };
    }
};