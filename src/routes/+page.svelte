<script lang="ts">
  import type { ActionData } from "./$types";
  import { Input } from "$lib/components/ui/input"
  import { toast } from "svelte-sonner";
  import { supabase } from "$lib/supabaseClient";
  import * as Form from "$lib/components/ui/form";
  import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
  import { authSchema, type AuthSchema } from "./authSchema";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { Description } from "formsnap";
  

  export let data: SuperValidated<Infer<AuthSchema>>;

  const form = superForm(data, {
    validators: zodClient(authSchema),
    dataType: 'json'
  })

  const {form: formData, enhance, errors} = form;

</script>
<main>
  
</main>

<style> 
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
  }
</style>