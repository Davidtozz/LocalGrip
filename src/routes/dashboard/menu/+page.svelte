
<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card"
    import * as Dialog  from "$lib/components/ui/dialog";
    import * as Select from '$lib/components/ui/select'
    import {Label} from "$lib/components/ui/label";
    import * as Form from "$lib/components/ui/form";
    import { Plus } from "lucide-svelte";
    import { writable } from "svelte/store";
    import { menuItemSchema, type MenuItemSchema } from "$lib/formSchemas";
    import { zodClient } from "sveltekit-superforms/adapters";
    import SuperDebug, { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
    import { Separator } from "$lib/components/ui/separator";
    import { browser } from "$app/environment";
    import {z} from "zod";
    import { Input } from "$lib/components/ui/input";
    import { toast } from "svelte-sonner";
    import { menuStore } from "$lib/stores";
    import { get } from "svelte/store";


    export let data: SuperValidated<Infer<MenuItemSchema>>;
    const form = superForm(data, {
        validators: zodClient(menuItemSchema),
        dataType: 'json',
        onUpdate: ({form: f}) => {
            if(f.valid) {
                toast.success("Item added to the menu!")
                menuStore.update((items) => {
                    if(items) return [...items, f.data]
                    return [f.data]
                })
            } else {
                toast.error("Please fill all the fields")
            }
        }
    })

    const {form: formData, enhance} = form;



    const TAGS = [
        "Primi",
        "Secondi",
        "Antipasti",
        "Bevande",
        "Dolci",
        "Pizze",
        "Vini",
        "Birre",
        "Cocktail",
        "Caffè",
        "Tè",
        "Liquori",
        "Grappe",
        "Aperitivi",
    ]


    $: selectedCategory = $formData.category ? {
        label: $formData.category,
        value: $formData.category
    } : undefined;

</script>


<Card.Root class="rounded-none flex flex-col w-full overflow-auto">
    <Card.Header class="flex flex-row justify-between">
        <h1 class="font-bold text-lg">Menù</h1>

        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="outline" class="p-2">
                    <Plus class="h-4"/>
                    <small>New Item</small>
                </Button>        
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>
                        <h1 class="text-lg">Add new item</h1>
                    </Dialog.Title>
                </Dialog.Header>
                <form method="POST" use:enhance>
                    <Form.Field {form} name="name">
                        <Form.Control>
                            <Form.Label>Name</Form.Label>
                            <Input class="w-full" bind:value={$formData.name}/>
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>

                    <Form.Field {form} name="description">
                        <Form.Control>
                            <Form.Label>Description</Form.Label>
                            <Input class="w-full" bind:value={$formData.description}/>
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>

                    <Form.Field {form} name="price" >
                        <Form.Control>
                            <Form.Label>Price</Form.Label>
                            <Input class="w-full" type="number" bind:value={$formData.price}/>
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                    <Form.Field {form} name="category">
                        <Form.Control let:attrs>
                            <Form.Label>Category</Form.Label>
                            <Select.Root selected={selectedCategory} onSelectedChange={(v) => {v && ($formData.category = v.value)}}>
                              <Select.Trigger {...attrs}>
                                <Select.Value placeholder="Choose a category" />
                              </Select.Trigger>
                              <Select.Content>
                                <Select.Item value="primo">Primo</Select.Item>
                                <Select.Item value="secondo">Secondo</Select.Item>
                                <Select.Item value="contorno">Contorno</Select.Item>
                              </Select.Content>
                            </Select.Root>    
                            <input hidden aria-hidden bind:value={$formData.category} name={attrs.name}/>
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>

                    <Form.Button >
                        Submit
                    </Form.Button>
                </form>
                    
            </Dialog.Content>
        </Dialog.Root>
    </Card.Header>
    <Card.Content class="flex flex-col">
        <section id="main-courses" class="p-2 rounded-sm">
            <Label>Primo piatto</Label>
                <div class="grid grid-cols-4 grid-rows-1 gap-2 text-secondary">
                    {#each $menuStore ?? [] as item}
                        {@debug item, menuStore}

                        <Card.Root>
                            <Card.Content class="object-contain bg-red p-2">
                                <img src={`https://source.unsplash.com/random?${item.name}/150x150`} alt={`${item.name}`}>
                            </Card.Content>
                        <Card.Footer>
                                <Label>{item.name ?? undefined}</Label>
                        </Card.Footer>
                        </Card.Root>
                    {/each}
                </div> 
            </section>
        
        
       
    </Card.Content>
</Card.Root>