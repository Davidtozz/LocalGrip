import { supabase } from "$lib/supabaseClient";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";


export const load: PageServerLoad = async () => {
    const { data, error } = await supabase.from('todos').select();
    
    if(error) {
        return fail(500, {
            message: "Failed to fetch todos."
        });
    }

    return {
        todos: data
    }
};
