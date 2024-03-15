<script lang="ts">
  import { Input } from "$lib/components/ui/input"
  import * as Form from "$lib/components/ui/form";
  import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
  import { authSchema, type AuthSchema } from "$lib/authSchema";
  import { zodClient } from "sveltekit-superforms/adapters";
  import * as Card from "$lib/components/ui/card";

  export let data: SuperValidated<Infer<AuthSchema>>;

  const form = superForm(data, {
    validators: zodClient(authSchema),
    dataType: 'json'
  })

  const {form: formData, enhance, errors} = form;
</script>
<div class="flex items-center justify-center min-h-screen">
<Card.Root class="w-[350px]">
  <Card.Header>
    <Card.Title>Signup for a new account</Card.Title>
  </Card.Header>
  <Card.Content class="space-y-1">
  <form method="POST" action="?/signUp" use:enhance >
    <Form.Field {form} name="email">
      <Form.Control let:attrs>
        <Form.Label>Email</Form.Label>
        <Input {...attrs} bind:value={$formData.email} />
      </Form.Control>
      <Form.FieldErrors>
        {#each $errors?.email ?? [] as error}
          <div>{error}</div>
        {/each}
      </Form.FieldErrors>
    </Form.Field>
    
    <Form.Field {form} name="password">
      <Form.Control let:attrs>
        <Form.Label>Password</Form.Label>
        <Input {...attrs} bind:value={$formData.password} type="password"/>
      </Form.Control>
      <Form.FieldErrors>
        {#each $errors?.password ?? [] as error}
          <div>{error}</div>
        {/each}
      </Form.FieldErrors>
    </Form.Field>
  </form>
  </Card.Content>
  
  <Card.Footer class="space-y-1">
    <Form.Button class="w-full">Submit</Form.Button>
  </Card.Footer>
</Card.Root>
</div>
