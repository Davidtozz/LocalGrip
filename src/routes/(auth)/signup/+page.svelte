<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Label } from "$lib/components/ui/label";
  import {
    superForm,
    type Infer,
    type SuperValidated,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { SignupSchema } from "$lib/FormSchemas";
  import { Input } from "$lib/components/ui/input/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import { GoogleLogo, LoadingSpinner, SignupBg} from "$lib/components/assets/index";
  import { goto } from "$app/navigation";
  import { toast } from "svelte-sonner";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import * as Card  from "$lib/components/ui/card";
  import PasswordMeter from "$lib/components/PasswordMeter.svelte";
    import { supabase } from "$lib/supabaseClient";
    import { onDestroy } from "svelte";
    import { browser } from "$app/environment";


  export let data: SuperValidated<Infer<typeof SignupSchema>>;

  let showMeter: boolean = false;

  const form = superForm(data, { 
    dataType: "json",
    validators: zodClient(SignupSchema),
    onUpdate: ({form}) => {
      if(form.valid) {
        if(browser) {
          toast.success("Form is valid");
          window.location.href = "/signup/business";
        }
      }
    }
  });


  const { form: formData, enhance, submitting } = form;
  
</script>


  <!-- Form container -->
  <div class="flex items-center justify-center py-12 md:py-6" >
    <div class="mx-auto grid md:w-[450px] sm:w-[350px] gap-5">
      <header class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Sign up</h1>
        <p class="text-balance text-muted-foreground">
          Enter your details below to create your account
        </p>
      </header>
      <form class="grid gap-4" method="POST" use:enhance>

        <div class="flex flex-row gap-2 justify-between">
          <Form.Field class="grid gap-2 flex-grow" {form} name="firstname">
          <Form.Control let:attrs>
            <Label for="firstname">First name
            </Label>
            <Input 
              {...attrs}
              id="firstname"
              type="text"
              placeholder="e.g. Marcus"
              bind:value="{$formData.firstname}" />
             
          </Form.Control><Form.FieldErrors />
        </Form.Field>

        <Form.Field class="grid gap-2 flex-grow" {form} name="lastname">
          <Form.Control let:attrs>
            <Label for="firstname">Last name
            </Label>
            <Input 
              {...attrs}
              id="lastname"
              type="text"
              placeholder="e.g. Aurelius"
              bind:value="{$formData.lastname}" />
            
          </Form.Control><Form.FieldErrors />
        </Form.Field>
        </div>
        
        <!-- todo: show if username is taken, in realtime -->

        <Form.Field class="grid gap-2" {form} name="email">
          <Form.Control let:attrs>
            <Label for="email">Email</Label>
            <Input 
              {...attrs}
              id="email"
              type="email"
              placeholder="m@example.com"
              bind:value="{$formData.email}" />
            
          </Form.Control><Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="password" class="grid gap-2">
          <Form.Control>
            
            <Label for="password">Password</Label>
              
            <Input
              id="password"
              type="password"
              on:focus={() => showMeter = true}
              on:focusout={() => showMeter = false}
              bind:value={$formData.password} />
             
              <!-- {#if showMeter} todo: improve passwordmeter
                <PasswordMeter  password={$formData.password}/>
              {/if} -->
            
          </Form.Control><Form.FieldErrors />
          
        </Form.Field>

        <Form.Field {form} class="flex flex-col gap-2 p-2" name="isBusinessOwner">
          <Form.Control let:attrs>
            <div class="flex flex-row items-center space-x-2">
              <Checkbox {...attrs} id="isowner-checkbox" bind:checked={$formData.isBusinessOwner} aria-labelledby="isowner-label" class="rounded-[5px]"/>
              <Label for="isowner-checkbox" id="isowner-label">I am a business owner</Label>  
           </div>
          {#if $formData.isBusinessOwner} 
            <small class="text-muted-foreground">
              You will be promped to create a business profile. 
            </small>
          {/if}
          </Form.Control>
          
        </Form.Field>

        <Button
          type="submit"
          class="{`w-full ${$submitting ? 'space-x-2' : ''}`}">
          {#if $submitting}
            <LoadingSpinner />
            <p class="text-muted-foreground">Sign up</p>
          {:else}
            Sign up
          {/if}
        </Button>

        <Button variant="outline" class="w-full space-x-2">
          <GoogleLogo class="h-full w-4" />
          <p>Sign up with Google</p>
        </Button>
      </form>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="/signin" class="underline"> Sign in </a>
      </div>
    </div>
  </div>
  