<script lang="ts">
  import File from "lucide-svelte/icons/file";
  import ListFilter from "lucide-svelte/icons/list-filter";
  import Ellipsis from "lucide-svelte/icons/ellipsis";
  import CirclePlus from "lucide-svelte/icons/circle-plus";

  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import * as Select from "$lib/components/ui/select";
  import NewItemButton from "$lib/components/ui/button/NewItemButton.svelte";
  import { enhance } from "$app/forms";
  import { menuStore } from "$lib/stores";
  import { toast } from "svelte-sonner";
  import {
    superForm,
    type SuperValidated,
    type SuperForm,
  } from "sveltekit-superforms";
  import { zodClient, type Infer } from "sveltekit-superforms/adapters";
  import { MenuItemSchema } from "$lib/FormSchemas.js";
  import { Plus } from "lucide-svelte";
  import { onMount } from "svelte";

  export let data;

  $: selectedCategory = $formData.category
    ? {
        label: $formData.category,
        value: $formData.category,
      }
    : undefined;

  const form = superForm(data.form, {
    validators: zodClient(MenuItemSchema),
    validationMethod: "oninput",
    dataType: "json",
    onUpdated: ({ form: f }) => {
      console.log("Form updated: ", f);
      if (f.valid) {
        menuStore.add(f.data);
        toast.success("Item added to the menu!");
      } else {
        toast.error("Please fill all the fields");
      }
    },
  });
  
  const { form: formData, constraints, posted } = form;

  let currentAction: "?/newItem" | "?/editItem" = "?/editItem";

  function editItem(itemId: string) {
    
    const item = menuStore.getById(itemId)!

    $formData.name = item.name
    $formData.ingredients = item.ingredients
    $formData.price = item.price
    $formData.category = item.category

    currentAction = "?/editItem"



    dialogOpen = true;
  }

  $: menuStore.set(data.data);

  

  let dialogOpen: boolean = false;

  console.log("Menu items: ", JSON.stringify(data.data));
</script>

<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 h-full">
 
    <Dialog.Root
    open={dialogOpen}
    onOutsideClick={() => (dialogOpen = false)}
    closeOnEscape={false}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>
          <h1 class="text-lg">Edit item</h1>
        </Dialog.Title>
      </Dialog.Header>
      <form
        id="newitem"
        method="POST"
        use:enhance
        class="flex flex-col gap-3"
        action={currentAction}>
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

        <Form.Field {form} name="ingredients">
          <Form.Control>
            <Form.Label>Description</Form.Label>
            <Input
              class="w-full"
              bind:value="{$formData.ingredients}"
              {...$constraints.ingredients} />
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
              class="select-none"
              on:click={() => {dialogOpen = false}}>
              EditPa
            </Form.Button>
          </Dialog.Close>
        </Dialog.Footer>
      </form>
    </Dialog.Content>
  </Dialog.Root>    
  

  {#if menuStore.isEmpty()}
    <!-- todo: extract item creation dialog to separate component (or figure out how to programmatically open it) -->
    <Card.Root class="flex flex-1 items-center justify-center h-full">
      <div class="text-center flex flex-col gap-2">
        <h1 class="text-2xl font-semibold">No menu found</h1>
        <h3 class="text-base text-muted-foreground">
          You don't have anything on the menu.
        </h3>
        <Button
          size="lg"
          class="space-x-1 w-min self-center"
          on:click="{() => (dialogOpen = true)}">
          <h1 class="text-center">Create menu</h1>
        </Button>
      </div>
    </Card.Root>
  {:else}
    <Tabs.Root value="all">
      <div class="flex items-center">
        <Tabs.List>
          <Tabs.Trigger value="all">Tutti</Tabs.Trigger>
          <Tabs.Trigger value="active">Primi</Tabs.Trigger>
          <Tabs.Trigger value="draft">Secondi</Tabs.Trigger>
          <Tabs.Trigger value="archived" class="  sm:flex">
            Contorni
          </Tabs.Trigger>
        </Tabs.List>
        <div class="ml-auto flex items-center gap-2">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
              <Button
                builders="{[builder]}"
                variant="outline"
                size="sm"
                class="h-8 gap-1">
                <ListFilter class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Label>Filter by</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.CheckboxItem checked>
                Active
              </DropdownMenu.CheckboxItem>
              <DropdownMenu.CheckboxItem>Draft</DropdownMenu.CheckboxItem>
              <DropdownMenu.CheckboxItem>Archived</DropdownMenu.CheckboxItem>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Button size="sm" variant="outline" class="h-8 gap-1">
            <File class="h-3.5 w-3.5" />
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>

          <!-- todo: remove hidden margin (its hidden somewhere i swear) -->

          <!--  <Dialog.Trigger>
                      
                      <Button size="sm" class="h-8 gap-1">
                        <Plus class="h-3.5 w-3.5" />
                        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            New
                        </span>
                        </Button>
                    </Dialog.Trigger> -->
        </div>
      </div>
      <Tabs.Content value="all">
        <Card.Root>
          <Card.Header>
            <Card.Title>Menu</Card.Title>
            <Card.Description>
              View and manage your menu listing
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.Head class="sm:table.-cell w-[100px] hidden">
                    <span class="sr-only">Image</span>
                  </Table.Head>
                  <Table.Head>Name</Table.Head>
                  <Table.Head>Ingredients</Table.Head>
                  <Table.Head class="md:table.-cell">Category</Table.Head>
                  <Table.Head class="md:table.-cell">Price</Table.Head>
                  <Table.Head>Actions</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>

                {#each $menuStore as item (item.id)}
                  <Table.Row>
                    <Table.Cell class="sm:table.-cell">
                      {item.name}
                    </Table.Cell>
                    <Table.Cell>
                      {item.ingredients}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="outline">{item.category}</Badge>
                    </Table.Cell>
                    <Table.Cell class="md:table.-cell">
                      {item.price}
                    </Table.Cell>
                    <Table.Cell>
                      <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild let:builder>
                          <Button
                              builders={[builder]}
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                          >
                              <Ellipsis class="h-4 w-4" />
                              <span class="sr-only">Toggle menu</span>
                          </Button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content align="end">
                          <DropdownMenu.Label>Actions</DropdownMenu.Label>
                          <DropdownMenu.Item on:click={() => {if(item.id) editItem(item.id)}}>Edit</DropdownMenu.Item>
                          <DropdownMenu.Item>Delete</DropdownMenu.Item>
                          </DropdownMenu.Content>
                      </DropdownMenu.Root>
                      </Table.Cell>
                  </Table.Row>
                {/each}

              </Table.Body>
            </Table.Root>
          </Card.Content>
          <Card.Footer>
            <div class="text-xs text-muted-foreground">
              Showing <strong>{data.data.length}</strong> of <strong>{data.data.length}</strong> items
            </div>
          </Card.Footer>
        </Card.Root>
      </Tabs.Content>
    </Tabs.Root>
  {/if}
</main>
