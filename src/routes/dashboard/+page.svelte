
<script lang="ts">
    import ThemeButton from "$lib/components/ui/button/ThemeButton.svelte";
    import * as Card from "$lib/components/ui/card"
    import { Separator } from "$lib/components/ui/separator";
    import LineChart  from "$lib/components/LineChart.svelte";
    
    export const ssr = false;

</script>

<Card.Root class="h-dvh rounded-none flex-grow m-0 border-0 bg-primary-foreground">   
    <Card.Header class="justify-between flex-row p-5">
        <h1 class="font-bold text-lg">Dashboard</h1>
    </Card.Header>
    <!-- <Separator /> -->
    <Card.Content class="grid grid-cols-3 grid-rows-2 gap-2">

        <LineChart />
        <LineChart />
        <LineChart />
        <LineChart />
        <LineChart />
        <LineChart />
    </Card.Content>
</Card.Root>    