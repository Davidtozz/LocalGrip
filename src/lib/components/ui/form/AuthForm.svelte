<script lang="ts">
  import type { SuperForm } from "sveltekit-superforms/client";
    import Button from "../button/button.svelte";
    import * as Card from "../card";
    import * as Form from "../form";
  import { Input } from "../input";

    export let action: string;
    export let form: SuperForm<{username: string; password: string; email?: string | undefined;}, any>;
    const {form: formData, errors} = form;

    export let isSignup: boolean = true;
</script>

<div class="flex items-center justify-center min-h-screen">
<Card.Root class="w-[350px]">
    <Card.Header>
        <Card.Title>
            {#if isSignup}
                Signup for a new account
            {:else}
                Login to your account
            {/if}
        </Card.Title>
    </Card.Header>
    <Card.Content>
        <form method="POST" id="authform" {action} use:form.enhance>
           <Form.Field {form} name="username">
            <Form.Control let:attrs>
                <Form.Label>Username</Form.Label>
                <Input {...attrs} bind:value={$formData.username} />
            </Form.Control>
            <!-- <Form.Description>This will be your username.</Form.Description> -->
            <Form.FieldErrors />
           </Form.Field>

           {#if isSignup}
            <Form.Field {form} name="email" aria-required>
                <Form.Control let:attrs>
                    <Form.Label>Email</Form.Label>
                    <Input {...attrs} bind:value={$formData.email} />
                </Form.Control>
                <Form.FieldErrors />
                <!-- <Form.Description>We will send you a confirmation email.</Form.Description> -->
            </Form.Field>
           {/if}
           <Form.Field {form} name="password">
            <Form.Control let:attrs>
                <Form.Label>Password</Form.Label>
                <Input {...attrs} bind:value={$formData.password} />
            </Form.Control>
            <!-- <Form.Description>Type in a strong password!</Form.Description> -->
            <Form.FieldErrors />
           </Form.Field>
           
           
        </form>
        <Card.Footer>
            <slot name="form-footer" >
                <Button form="authform" type="submit" class="w-full">Submit</Button>
            </slot>
        </Card.Footer>
    </Card.Content>
</Card.Root>
</div>