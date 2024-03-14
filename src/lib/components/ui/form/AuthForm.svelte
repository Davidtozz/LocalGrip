<script lang="ts" generics="">
    export let form: SuperForm<any>;
    export let formData;
    export let errors;
    import { toast } from "svelte-sonner";
    import { Input } from "$lib/components/ui/input";
    import * as Form from "$lib/components/ui/form";
  import type { SuperForm } from "sveltekit-superforms";
</script>

<form method="POST" use:form.enhance on:submit={() => toast("Submitting...")}>
    
    <Form.Field {form} name="email">
      <Form.Control let:attrs>
        <Form.Label>Email</Form.Label>
        <Input {...attrs} bind:value={$formData.email} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="password">
      <Form.Control let:attrs>
        <Form.Label>Password</Form.Label>
        <Input {...attrs} bind:value={$formData.password} type="password"/>
      </Form.Control>
      <Form.FieldErrors>
         {$errors?.password ?? []}
      </Form.FieldErrors>
    </Form.Field>
    
    <Form.Button>Submit</Form.Button>
</form>