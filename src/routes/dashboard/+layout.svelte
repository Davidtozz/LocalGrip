<script lang="ts">
    import * as Card from "$lib/components/ui/card"
    import {Button} from "$lib/components/ui/button/index";
    import ThemeButton from "$lib/components/ui/button/ThemeButton.svelte";
    import { Cookie, BarChart2, Utensils, Settings, Package, ChefHat, Home, Truck, MessageCircleDashed, LogOut   } from 'lucide-svelte';
    import { goto } from "$app/navigation";
    import * as Avatar from "$lib/components/ui/avatar";
    import {Separator} from "$lib/components/ui/separator";
    import {Skeleton} from "$lib/components/ui/skeleton";
    import * as Tooltip from "$lib/components/ui/tooltip";
</script>
<div class="flex flex-row flex-1 w-screen ">
    <Card.Root class="flex rounded-none flex-col  justify-between w-48 border-0 bg-secondary-foreground">   
        <Card.Header>
            <Button variant="outline" class="w-full">
                <h1>Food SaaS</h1>
            </Button>
        </Card.Header>
        
        <Card.Content>
            <ul class="w-full">
                <li>
                    <Button variant="ghost" class="text-primary-foreground w-full" on:click={() => goto("/dashboard")}>
                        <Home class="w-10 h-5"/> 
                        Overview
                    </Button>
                </li>
               <!--  <li>
                    <Button variant="ghost" class="text-primary-foreground w-full text-start" on:click={() => goto("/dashboard/clients")}>
                       <Utensils class="w-10 h-5"/> Clients
                    </Button>
                </li> -->
                <li>
                    <Button variant="ghost" class="text-primary-foreground w-full" on:click={() => goto("/dashboard/products")}>
                        <ChefHat class="w-10"/>Menù
                    </Button>
                </li>
                <li>
                    <Button variant="ghost" class="text-primary-foreground w-full" on:click={() => goto("/dashboard/orders")}>
                        <Package class="w-10"/>Orders
                    </Button>
                </li>
                <li>
                    <Button variant="ghost" class="text-primary-foreground w-full" on:click={() => goto("/dashboard/settings")}>
                        <BarChart2 class="w-10"/>Analytics
                    </Button>
                </li>
                <li>
                    <Button variant="ghost" class="text-primary-foreground w-full" on:click={() => goto("/dashboard/settings")}>
                        <Truck class="w-10"/> Delivery
                    </Button>
                </li>
                <li>
                    <Button variant="ghost" class="text-primary-foreground w-full" on:click={() => goto("/dashboard/settings")}>
                        <MessageCircleDashed  class="w-10"/> Feedback
                    </Button>
                </li>
                <li>
                    <Button variant="ghost" class="text-primary-foreground w-full" on:click={() => goto("/dashboard/settings")}>
                        <Settings class="w-10"/>Settings
                    </Button>
                </li>
                
            </ul>
        </Card.Content>

        <Card.Footer class="w-full p-3 ">
            <div class="flex flex-row w-full h-full justify-between">
                <Avatar.Root class="object-contain">
                    <Avatar.Image src="https://source.unsplash.com/random/300x300" class="border-primary border-2 rounded-full"/>
                </Avatar.Root>    
                <div class="flex flex-col">
                    <small class="text-primary-foreground">John Doe</small>
                    <small class="text-primary">Owner</small>
                </div>
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <LogOut class="self-center text-secondary w-8 h-5" />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p>Logout</p>
                    </Tooltip.Content>
                </Tooltip.Root>
            </div>
        </Card.Footer>
    </Card.Root>
    <slot />
</div>