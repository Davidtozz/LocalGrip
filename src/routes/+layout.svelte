<script lang="ts">
  import { Toaster } from "$lib/components/ui/sonner";
  import { supabase } from "$lib/supabaseClient";
  import { toast } from "svelte-sonner";
  import "../app.pcss";
  import { ModeWatcher } from "mode-watcher";
  import { goto } from "$app/navigation";

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      goto("/");
    }
  });
</script>

<Toaster position="top-center" />
<ModeWatcher />
<slot />

<svelte:head>
  <title>LocalGrip</title>
  <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"> -->
</svelte:head>
