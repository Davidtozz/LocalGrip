<script lang="ts">
    import ThemeButton from "$lib/components/ui/button/ThemeButton.svelte";
    import * as Card from "$lib/components/ui/card"
    import { Separator } from "$lib/components/ui/separator";
    import {Line} from 'svelte-chartjs';
</script>

<Card.Root class="h-dvh rounded-none flex-grow m-0 border-0 bg-primary-foreground">   
    <Card.Header class="justify-between flex-row p-5">
        <h1 class="font-bold text-lg">Dashboard</h1>
    </Card.Header>
    <Separator />
    <Card.Content>
        
        <!-- KPI widgets -->
        <Card.Root>
            <Card.Header>
                <h1 class="font-bold text-lg">KPI</h1>
            </Card.Header>
            <Card.Content>
                <div class="flex flex-row flex-wrap">
                    <Card.Root class="flex flex-col w-1/2 p-5">
                        <Card.Header>
                            <h1 class="font-bold text-lg">Total Orders</h1>
                        </Card.Header>
                        <Card.Content>
                            <Line />
                        </Card.Content>
                    </Card.Root>
                    <Card.Root class="flex flex-col w-1/2 p-5">
                        <Card.Header>
                            <h1 class="font-bold text-lg">Total Revenue</h1>
                        </Card.Header>
                        <Card.Content>
                            <h1 class="font-bold text-3xl">1000$</h1>
                        </Card.Content>
                    </Card.Root>
                </div>
            </Card.Content>
        </Card.Root>




    </Card.Content>
</Card.Root>    