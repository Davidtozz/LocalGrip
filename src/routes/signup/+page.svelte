<script lang="ts">
  import SimpleSpinner from './SimpleSpinner.svelte';

    import * as Card from "$lib/components/ui/card";
    import * as Form from "$lib/components/ui/form";
    import { Label } from "$lib/components/ui/label";
    import { superForm, type Infer, type SuperValidated, type SuperForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { z } from "zod";
    import { SignupSchema } from "./schema.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import Button from "$lib/components/ui/button/button.svelte";

    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome'
    import { faGoogle } from '@fortawesome/free-brands-svg-icons'
    import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
    import { config } from '@fortawesome/fontawesome-svg-core'
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import GoogleLogo from "./GoogleLogo.svelte";
    import Spinner from "./SimpleSpinner.svelte";

    export let data: SuperValidated<Infer<typeof SignupSchema>>;
    
    config.autoAddCss = false;
    

    const form = superForm(data, {
        dataType: "json",
        validators: zodClient(SignupSchema)
    })

    const {form: formData, enhance, submitting} = form;

</script>
<!-- xl:min-h-[800px]  -->

<div class="w-full lg:grid lg:h-screen lg:grid-cols-2  ">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-5">
        <header class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Sign up</h1>
          <p class="text-balance text-muted-foreground">
            Enter your details below to create your account
          </p>
        </header>
        <form class="grid gap-4" method="POST" use:enhance>
          
            <Form.Field class="grid gap-2" {form} name="email">
                
                <Form.Control>
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" bind:value={$formData.email} />
                    <Form.FieldErrors />
                </Form.Control>

            </Form.Field>

          <Form.Field {form} name="password" class="grid gap-2">
            <Form.Control>
                <div class="flex items-center">
                    <Label for="password">Password</Label>
                    <a href="/forgot-password" class="ml-auto inline-block text-sm underline">
                      Forgot your password?
                    </a>
                </div>

                <Input id="password" type="password" bind:value={$formData.password} />
                
            </Form.Control>
            <Form.FieldErrors />     
          </Form.Field>
          <Button type="submit" class={`w-full ${$submitting ? "space-x-2" : ""}`}>
            {#if $submitting}
                <Spinner />
                <p class="text-muted-foreground">Sign up</p>
            {:else}
                Sign up
            {/if}
          </Button>
          <Button variant="outline" class="w-full space-x-2">
            <GoogleLogo class="h-full w-4"/>
            <p>Sign up with Google</p>
          </Button>
        </form>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <a href="/signin" class="underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
     
    </div>
  </div>


<!-- 
<main class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <form use:enhance method="POST" class="bg-secondary-foreground h-full w-6/12 p-6 flex flex-col gap-4" enctype="multipart/form-data">

        <Button class="flex gap-2" variant="outline">
           <FontAwesomeIcon icon={faGoogle} class="h-full" color="white"/> Signup with Google
        </Button>

        <div class="flex flex-row items-center gap-2">
            <Separator orientation="horizontal" class="w-auto flex-grow bg-muted-foreground" /> 
            
            <h2 class="text-muted-foreground">or</h2> 
            
            <Separator orientation="horizontal" class="w-auto flex-grow bg-muted-foreground" />
        </div>

        <Label class="text-white">Username</Label>
        <Form.Field name="username" {form}>
            <Form.Control let:attrs>
                <Input {...attrs} bind:value="{$formData.username}" class="text-white"/>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Label class="text-white">Email</Label>
        <Form.Field name="email" {form}>
            <Form.Control let:attrs>
                <Input {...attrs} bind:value="{$formData.email}" class="text-white" type="email"/>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        
        <Label class="text-white">Password</Label>
        <Form.Field name="password" {form}>
            <Form.Control let:attrs>
                <Input {...attrs} bind:value="{$formData.password}" class="text-white" type="password"/>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>


        <Form.Button variant={$submitting ? "outline" : "default"} class={`flex flex-row gap-2 ${$submitting ? "bg-blend-darken" : ''}`}>
 
            <div role="status" class="text-center">
                <svg aria-hidden="true" class="size-4 flex-grow text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            <small class="text-muted">Submit</small>
            
        </Form.Button>
    </form>
</main>
 -->