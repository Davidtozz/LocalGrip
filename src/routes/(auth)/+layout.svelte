<script lang="ts">
    import { page } from "$app/stores";
    import { SignupBg } from "$lib/components/assets";

</script>
<main class="w-full lg:grid lg:h-screen lg:grid-cols-2">
    {#key $page.url}
      <slot />
    {/key}
    <div class="hidden bg-muted lg:block p-5">
      <div class="flex flex-col justify-center items-center size-full">
        <SignupBg class="w-3/4"/>
    
      </div>
    </div>
</main>