<script lang="ts">
  import { Toaster } from "$lib/components/ui/sonner";
  import { supabase } from "$lib/supabaseClient";
  import "../app.pcss";

  const {data:{subscription}} = supabase.auth.onAuthStateChange(async (event, session) => {
    console.log(event, session)

    switch (event) {
      case 'INITIAL_SESSION':
        console.log("You're in your initial session");
        break;
      case 'SIGNED_IN':
        console.log("You're signed in");
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
  })

</script> 
  
<Toaster position="top-center"/>
<slot />

<svelte:head>
    <title>Testing</title>
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"> -->
</svelte:head>