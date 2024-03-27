<script lang="ts">
  import type { Infer, SuperForm } from "sveltekit-superforms/client";
  import Button from "../button/button.svelte";
  import * as Card from "../card";
  import * as Form from "../form";
  import { Input } from "../input";
  import type { AuthSchema } from "$lib/formSchemas";

  export let form: SuperForm<Infer<AuthSchema>>;
  const { form: formData } = form;

  let isSignup: boolean = true;
</script>

<div class="flex items-center justify-center min-h-screen">
  <Card.Root class="w-[350px]">
    <Card.Header>
      <Card.Title>
        {#if isSignup}
          Signup for a new account <!-- todo: enhance styles -->
        {:else}
          Login to your account
        {/if}
      </Card.Title>
    </Card.Header>
    <Card.Content>
      <form method="POST" id="authform" use:form.enhance enctype="multipart/form-data">
        {#if isSignup}
          <Form.Field {form} name="username">
            <Form.Control let:attrs>
              <Form.Label>Username</Form.Label>
              <Input {...attrs} bind:value="{$formData.username}" />
            </Form.Control>
            <!-- <Form.Description>This will be your username.</Form.Description> -->
            <Form.FieldErrors />
          </Form.Field>
        {/if}

        <Form.Field {form} name="email" aria-required>
          <Form.Control let:attrs>
            <Form.Label>Email</Form.Label>
            <Input {...attrs} bind:value="{$formData.email}" />
          </Form.Control>
          <Form.FieldErrors />
          <!-- <Form.Description>We will send you a confirmation email.</Form.Description> -->
        </Form.Field>

        <Form.Field {form} name="password">
          <Form.Control let:attrs>
            <Form.Label>Password</Form.Label>
            <Input {...attrs} bind:value="{$formData.password}" />
          </Form.Control>
          <!-- <Form.Description>Type in a strong password!</Form.Description> -->
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="avatar">
          <Form.Control let:attrs>
            <Form.Label>Avatar</Form.Label>
            <Input {...attrs} bind:value="{$formData.avatar}" type="file"/>
          </Form.Control>
          <!-- <Form.Description>Type in a strong password!</Form.Description> -->
          <Form.FieldErrors />
        </Form.Field>
      </form>
      <Card.Footer class="flex flex-col">
        <Button
          form="authform"
          type="submit"
          formaction="{isSignup ? '?/signUp' : '?/signIn'}"
          class="w-full">Submit</Button>
        {#if isSignup}
          <span
            class="flex flex-row w-full text-[10px] items-center justify-center"
            >Already have an account?
            <Button
              variant="link"
              class="text-[10px] p-2"
              on:click="{() => (isSignup = !isSignup)}">
              Login
            </Button></span>
        {:else}
          <span
            class="flex flex-row w-full text-[10px] items-center justify-center"
            >Don't have an account?
            <Button
              variant="link"
              class="text-[10px] p-2"
              on:click="{() => (isSignup = !isSignup)}">
              Signup
            </Button></span>
        {/if}
      </Card.Footer>
    </Card.Content>
  </Card.Root>
</div>
