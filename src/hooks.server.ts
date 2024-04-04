import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { createServerClient } from "@supabase/ssr";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        set: (key, value, options) => {
          event.cookies.set(key, value, { ...options, path: "/" });
        },
        remove: (key, options) => {
          event.cookies.delete(key, { ...options, path: "/" });
        },
      },
    },
  );

  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();
    return session;
  };


  /* todo: check roles */
  if (event.url.pathname.startsWith("/dashboard-new")) {
    const { data, error } = await event.locals.supabase.auth.getUser();
    if (error) {
      console.log(
        "A user tried to access ",
        event.url.pathname,
        " but was not logged in",
      );
      throw redirect(302, "/");
    }
    event.locals.user = data.user;
  }

  return resolve(event);
};


