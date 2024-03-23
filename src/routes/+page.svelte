<script lang="ts">
  import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
  import { authSchema, type AuthSchema } from "../lib/formSchemas";
  import AuthForm from '$lib/components/ui/form/AuthForm.svelte';
  import * as Card from '$lib/components/ui/card';
  import * as Form from '$lib/components/ui/form/';
  import { zodClient } from "sveltekit-superforms/adapters";
  import { Input } from "$lib/components/ui/input";
  import Button from "$lib/components/ui/button/button.svelte";
  
  export let data: SuperValidated<Infer<AuthSchema>>;
  let action: string;

  const form = superForm(data, {
    validators: zodClient(authSchema),
    dataType: 'json'
  })

</script>

<AuthForm {action} {form} isSignup={true} />
<a href="/dashboard">Go to dashboard</a>