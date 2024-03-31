<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Label } from "$lib/components/ui/label";
    import {
    superForm,
    type Infer,
    type SuperValidated,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { RestaurantProfileSchema } from "$lib/FormSchemas";
    import { Input } from "$lib/components/ui/input/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import {LoadingSpinner} from "$lib/components/assets/index";
    import { toast } from "svelte-sonner";
    import { goto } from "$app/navigation";
    import { FieldErrors } from "formsnap";
    import { browser } from "$app/environment";

    export let data: SuperValidated<Infer<typeof RestaurantProfileSchema>>;

    const form = superForm(data, {
        dataType: "json",
        validators: zodClient(RestaurantProfileSchema),
        onUpdated: async ({ form }) => {
            if(form.valid) {
                toast.success("All set! You can now start using the app.");
                if(browser) {
                    window.location.href = "/dashboard";
                } 
            } else {
                toast.error("Please fill in the required fields.");
            }
        }
    })

    const { form: formData, enhance, submitting } = form;

</script>

<div class="flex items-center justify-center py-12 md:py-6">
    <div class="mx-auto grid md:w-[450px] sm:w-[350px] gap-5">
        <header class="grid gap-2 text-center">
            <h1 class="text-3xl font-bold">Create a business profile</h1>
            
            <p class="text-balance text-muted-foreground">
                Your customers will be able to find you on the app using the details you provide here.
            </p>
        </header>
        <form method="POST" use:enhance class="grid gap-4">
            <div class="flex flex-row gap-2 justify-between">
                <Form.Field {form} name="name" class="grid gap-2 flex-[6]">
                    <Form.Control let:attrs>
                        <Label for="name">Name</Label>
                        <Input {...attrs} bind:value={$formData.name}/>
                        <Form.FieldErrors /> 
                    </Form.Control> 
                    {#if $formData.name}
                        <small class="text-muted-foreground">It will be displayed as @{$formData.name.trim()}</small>
                    {/if}              
                </Form.Field>

                <Form.Field {form} name="phone" class="grid gap-2 flex-[4]">
                    <Form.Control let:attrs>
                        <Label for="phone">Phone</Label>
                        <Input {...attrs} bind:value={$formData.phone}/>
                        <Form.FieldErrors />
                    </Form.Control>
                </Form.Field>
    
            </div>

            <Form.Field {form} name="address" class="grid gap-2 flex-grow">
                <Form.Control let:attrs>
                    <Label for="address">Address</Label>
                    <Input {...attrs} bind:value={$formData.address}/>
                    <Form.FieldErrors />
                </Form.Control>
            </Form.Field>

            <Form.Field {form} name="email" class="grid gap-2 flex-grow">
                <Form.Control let:attrs>
                    <Label for="email">Email
                        <small>(Optional)</small>
                    </Label>
                    <Input {...attrs} bind:value={$formData.email}/>
                    <Form.FieldErrors />
                </Form.Control>
            </Form.Field>

            <Form.Field {form} name="website">
                <Form.Control let:attrs >
                    <div class="flex space-between w-full">
                        <Label for="website">Website
                            <small>(Optional)</small>
                        </Label>
                        <a 
                        href="mailto:davidtozz.dev"
                        class="ml-auto inline-block text-sm underline">Need a website? Contact us!</a>
                    </div>
                    <Input {...attrs} bind:value={$formData.website}/>
                    <Form.FieldErrors />
                </Form.Control>
            </Form.Field>


            <p class="text-muted-foreground text-center">
                You can add more details in your profile settings.
            </p>


            <Button
          type="submit"
          class="{`w-full ${$submitting ? 'space-x-2' : ''}`}">
          {#if $submitting}
            <LoadingSpinner />
            <p class="text-muted-foreground">Setting up profile...</p>
          {:else}
            Finish
          {/if}
        </Button>

        </form>
    </div>
</div>