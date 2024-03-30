<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Select from "$lib/components/ui/select";
  import * as Form from "$lib/components/ui/form";
  import { Plus } from "lucide-svelte";
  import { menuItemSchema, type MenuItemSchema } from "$lib/FormSchemas";
  import { zodClient } from "sveltekit-superforms/adapters";
  import {
    superForm,
    type Infer,
    type SuperValidated,
  } from "sveltekit-superforms";
  import { Input } from "$lib/components/ui/input";
  import { toast } from "svelte-sonner";
  import { menuStore } from "$lib/stores";

  export let data: any;
  const form = superForm(data, {
    validators: zodClient(menuItemSchema),
    validationMethod: "oninput",
    dataType: "json",
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        menuStore.add(f.data);
        toast.success("Item added to the menu!");
      } else {
        toast.error("Please fill all the fields");
      }
    },
  });

  const { form: formData, enhance, constraints } = form;

  $: selectedCategory = $formData.category
    ? {
        label: $formData.category,
        value: $formData.category,
      }
    : undefined;
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <!-- todo: remove hidden margin (its hidden somewhere i swear) -->
    <Button variant="outline" class="p-2 m-0 space-y-0">
      <Plus class="h-4" />
      <small>New Item</small>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>
        <h1 class="text-lg">Add new item</h1>
      </Dialog.Title>
    </Dialog.Header>
    <form id="newitem" method="POST" use:enhance class="flex flex-col gap-3">
      <Form.Field {form} name="name">
        <Form.Control>
          <Form.Label>Name</Form.Label>
          <Input
            class="w-full"
            bind:value="{$formData.name}"
            {...$constraints.name} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="description">
        <Form.Control>
          <Form.Label>Description</Form.Label>
          <Input
            class="w-full"
            bind:value="{$formData.description}"
            {...$constraints.description} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="price">
        <Form.Control>
          <Form.Label>Price</Form.Label>
          <Input
            class="w-full"
            type="number"
            bind:value="{$formData.price}"
            {...$constraints.price} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="category">
        <Form.Control let:attrs>
          <Form.Label>Category</Form.Label>
          <Select.Root
            selected="{selectedCategory}"
            onSelectedChange="{(v) => {
              v && ($formData.category = v.value);
            }}">
            <Select.Trigger {...attrs}>
              <Select.Value placeholder="Choose a category" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="primo">Primo</Select.Item>
              <Select.Item value="secondo">Secondo</Select.Item>
              <Select.Item value="contorno">Contorno</Select.Item>
            </Select.Content>
          </Select.Root>
          <input
            hidden
            aria-hidden
            bind:value="{$formData.category}"
            name="{attrs.name}" />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Dialog.Footer>
        <!-- todo: close the dialog only when the form is valid -->
        <Dialog.Close>
          <Form.Button
            form="newitem"
            variant="default"
            data-dialog-close
            class="select-none">
            Submit
          </Form.Button>
        </Dialog.Close>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
