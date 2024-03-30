<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Label } from "$lib/components/ui/label";
  import {
    superForm,
    type Infer,
    type SuperValidated,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  //@ts-ignore
  import { SigninSchema } from "$lib/FormSchemas";
  
  import { Input } from "$lib/components/ui/input/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Checkbox } from "$lib/components/ui/checkbox"

  import {
    GoogleLogo,
    LoadingSpinner,
    SignupBg,
  } from "$lib/components/assets/index";
  import { goto } from "$app/navigation";
  import { toast } from "svelte-sonner";

  export let data: SuperValidated<Infer<typeof SigninSchema>>;

  const form = superForm(data, {
    dataType: "json",
    validators: zodClient(SigninSchema),
    onUpdated: async ({ form }) => {
      if (form.valid) {
        toast.success("Welcome on board!!!");

        goto("/dashboard");
      }
    },
  });

  const { form: formData, enhance, submitting } = form;
</script>

<!-- Signin form container -->
<div class="flex items-center justify-center py-12 md:py-6">
  <div class="mx-auto grid w-[350px] gap-5">
    <header class="grid gap-2 text-center">
      <h1 class="text-3xl font-bold">Sign in</h1>
      <p class="text-balance text-muted-foreground">
        Enter your credentials below to sign in
      </p>
    </header>
    <form class="grid gap-4" method="POST" use:enhance>
      <!-- todo: show if username is taken, in realtime -->

      <Form.Field class="grid gap-2" {form} name="email">
        <Form.Control let:attrs>
          <Label for="email">Email</Label>
          <Input {...attrs}
            class=""
            id="email"
            type="email"
            placeholder="m@example.com"
            bind:value="{$formData.email}" />
          <Form.FieldErrors />
        </Form.Control>
      </Form.Field>

      <Form.Field {form} name="password" class="grid gap-2">
        <Form.Control let:attrs>
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a
              href="/forgot-password"
              class="ml-auto inline-block text-sm underline">
              Forgot your password?
            </a>
          </div>

          <Input
            {...attrs}
            id="password"
            type="password"
            bind:value="{$formData.password}" />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>




      <Button
        type="submit"
        class="{`w-full ${$submitting ? 'space-x-2' : ''}`}">
        {#if $submitting}
          <LoadingSpinner />
          <p class="text-muted-foreground">Signing in...</p>
        {:else}
          Sign in
        {/if}
      </Button>
      <Button variant="outline" class="w-full space-x-2">
        <GoogleLogo class="h-full w-4" />
        <p>Sign in with Google</p>
      </Button>
    </form>
    <div class="mt-4 text-center text-sm">
      Need an account?
      <a href="/signup" class="underline"> Sign up </a>
    </div>
  </div>
</div>
