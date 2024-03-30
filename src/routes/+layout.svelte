<script lang="ts">
  import { Toaster } from "$lib/components/ui/sonner";
  import { supabase } from "$lib/supabaseClient";
  import { toast } from "svelte-sonner";
  import "../app.pcss";
  import { ModeWatcher } from "mode-watcher";
  import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { SignupBg } from "$lib/components/assets";

  supabase.auth.onAuthStateChange((event, session) => {

    /* console.log("event", event)

    console.log("User ID: ", session?.user.id) */


    if (event === "SIGNED_OUT") {
      const username = session?.user.user_metadata.username
        
      username ? toast.success(`Goodbye, ${username}!`)
        : toast.success("Goodbye!");
      goto("/");
    }

    /* if(event === "SIGNED_IN") {
      toast.success("Welcome back!");
      goto("/dashboard")
    } */
    
  });
</script>

<Toaster position="bottom-right" />
<ModeWatcher />
<main class="w-full lg:grid lg:h-screen lg:grid-cols-2">
{#key $page.url}
  <slot />
{/key}
<div class="hidden bg-muted lg:block p-5">
  <div class="flex flex-col justify-center items-center size-full">
    <SignupBg class="w-3/4"/>

  </div>
</div>
</main>

<svelte:head>
  <title>LocalGrip</title>
  <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"> -->
</svelte:head>
