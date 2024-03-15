<script lang="ts">
  import EmailPasswordForm from '../lib/components/ui/form/EmailPasswordForm.svelte';
  import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
  import { authSchema, type AuthSchema } from "../lib/authSchema";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { Button } from '$lib/components/ui/button';
  import { Moon, Sun } from 'svelte-radix';
  import { toggleMode } from 'mode-watcher';
  
  export let data: SuperValidated<Infer<AuthSchema>>;
  let showSignIn: boolean = false;
</script>

  
  {#if showSignIn}
    <EmailPasswordForm {data} />
  {/if}
  <EmailPasswordForm {data} />
  <!-- <Button on:click={toggleMode} variant="outline" size="icon">
    <Sun
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Moon
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button> -->


