// See https://kit.svelte.dev/docs/types#app

import type { SupabaseClient, User } from "@supabase/supabase-js";

// for information about these interfaces
declare global {
  namespace App {
    interface Error {}
    interface Locals {
      supabase: SupabaseClient;
      getSession(): Promise<Session | null>;
      user: User | null;
    }
    interface PageData {
      session: Session | null;
    }
    interface PageState {}
    interface Platform {}
  }
}

export {};
