<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { toggleMode } from "mode-watcher";
  import { Moon, Sun } from "lucide-svelte";
</script>

<Button on:click="{toggleMode}" size="icon" variant="secondary" class="p-0">
  <Sun
    class="h-[0.95rem] w-[0.95rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 p-0" />
  <Moon
    class="absolute h-[0.75rem] w-[0.75rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 p-0" />
  <span class="sr-only">Toggle theme</span>
</Button>
