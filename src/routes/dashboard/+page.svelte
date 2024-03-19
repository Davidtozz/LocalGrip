<script lang="ts">
    import ThemeButton from "$lib/components/ui/button/ThemeButton.svelte";
    import * as Card from "$lib/components/ui/card"
    import { Separator } from "$lib/components/ui/separator";
    import * as Table from "$lib/components/ui/table";
    import {Label} from "$lib/components/ui/label";
    import LineChart  from "$lib/components/LineChart.svelte";
    import DataTable from "$lib/components/ui/data-table/data-table.svelte";
</script>

<Card.Root class="h-dvh rounded-none flex-grow m-0 border-0 bg-primary-foreground flex flex-col">   
    <Card.Header class="justify-between flex-row ">
        <h1 class="font-bold text-lg">Dashboard</h1>
    </Card.Header>




    <!-- <Separator /> -->
    <Card.Content class="grid grid-cols-3 grid-rows-4 gap-3 h-full m-h-full overflow-auto">

        <div class="col-span-2 row-span-2 ">
            <LineChart />
        </div>
        <div class="col-span-1 row-span-1 bg-secondary-foreground"></div>
        <div class="col-span-1 row-span-1 bg-secondary-foreground"></div>
        <div class="col-span-1 row-span-2 bg-secondary-foreground"></div>

        <Card.Root class="col-span-2 row-span-2 ">
            <Card.Header>
                <Label >
                    Recent orders
                </Label>
            </Card.Header>
            <Card.Content>
                <DataTable />
            </Card.Content>
        </Card.Root>
        <!-- <LineChart />
        <LineChart />
        <LineChart />
        <LineChart /> -->
    </Card.Content> 
</Card.Root>    