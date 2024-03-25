<script lang="ts">
  import NewItemButton from "../../../lib/components/ui/button/NewItemButton.svelte";
  import * as Card from "$lib/components/ui/card";
  import { Label } from "$lib/components/ui/label";
  import type { MenuItemSchema } from "$lib/formSchemas";
  import { type Infer, type SuperValidated } from "sveltekit-superforms";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Edit, EditIcon, Ellipsis } from "lucide-svelte";

  import { menuStore } from "$lib/stores";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { Button } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  export let data: SuperValidated<Infer<MenuItemSchema>>;

  let testArray = [...Array(20).keys()];
</script>

<!-- todo:  fix horrible styling 💀 -->
<Card.Root class="rounded-none flex flex-col w-full overflow-hidden  border-0">
  <Card.Header class="flex flex-row justify-between items-center h-fit">
    <h1 class="font-bold text-lg">Menù</h1>
    <NewItemButton {data} />
  </Card.Header>
  <Card.Content class="bg-gray-700 h-full">
    <section id="main-courses" class="p-2 rounded-sm flex-1 h-full">
      <Label>Primo piatto</Label>
      <div
        class="{`grid grid-cols-3 grid-rows-6 gap-2 text-secondary h-full `}">
        {#each $menuStore as item}
          <Card.Root
            class="relative flex flex-row gap-2 bg-card p-2 text-secondary-foreground rounded-sm">
            <Avatar.Root class="rounded-sm h-auto w-auto">
              <Avatar.Image
                src="{`https://source.unsplash.com/random?${item.name}/150x150`}"
                alt="first" />
              <Avatar.Fallback>
                <Skeleton />
              </Avatar.Fallback>
            </Avatar.Root>
            <div class="flex flex-col truncate">
              <small class="text-medium">{item.name}</small>
              <small class="truncate text-muted-foreground"
                >{item.description}</small>
              <small class="text-xs text-muted-foreground"
                >€ {item.price}</small>
            </div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger class="absolute top-1 right-2">
                <Ellipsis
                  stroke="{'1'}"
                  size="{20}"
                  class="text-muted-foreground hover:text-secondary-foreground" />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content side="bottom">
                <DropdownMenu.Group>
                  <DropdownMenu.Item
                    class="text-[10px] text-muted-foreground hover:font-medium flex flex-row gap-3">
                    <Edit size="{10}" />Edit</DropdownMenu.Item>
                  <DropdownMenu.Item
                    class="text-[10px] text-muted-foreground hover:font-medium flex flex-row gap-3"
                    >Billing</DropdownMenu.Item>
                  <DropdownMenu.Item
                    class="text-[10px] text-muted-foreground hover:font-medium flex flex-row gap-3"
                    >Team</DropdownMenu.Item>
                  <DropdownMenu.Item
                    class="text-[10px] text-muted-foreground hover:font-medium flex flex-row gap-3"
                    >Subscription</DropdownMenu.Item>
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Card.Root>
        {/each}
      </div>
    </section>
  </Card.Content>
</Card.Root>
