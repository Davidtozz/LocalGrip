<script lang="ts">
  import { Toaster } from "$lib/components/ui/sonner";
  import { supabase } from "$lib/supabaseClient";
  import { toast } from "svelte-sonner";
  import "../app.pcss";
  import { ModeWatcher } from "mode-watcher";

  /* const {data:{subscription}} = supabase.auth.onAuthStateChange(async (event, session) => {
    console.log(event, session)

    switch (event) {
      case 'INITIAL_SESSION':
        console.log("You're in your initial session");
        break;
      case 'SIGNED_IN':
        toast("You've signed in!")
        break;
      case 'SIGNED_OUT':
        console.log("You're signed out");
        break;
      case 'PASSWORD_RECOVERY':
        console.log("You're in password recovery");
        break;
      case 'TOKEN_REFRESHED':
        console.log("You're in token refreshed");
        break;
      case 'USER_UPDATED':
        console.log("You're in user updated");
        break;
    }
  }) */

</script> 
  
<Toaster position="top-center"/>
<ModeWatcher />
<slot />

<svelte:head>
    <title>Food SaaS</title>
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"> -->
</svelte:head>