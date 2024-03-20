
<script lang="ts">
    import * as Card from "$lib/components/ui/card"
    import {Label} from "$lib/components/ui/label";


    const TAGS = [
        "Primi",
        "Secondi",
        "Antipasti",
        "Bevande",
        "Dolci",
        "Pizze",
        "Vini",
        "Birre",
        "Cocktail",
        "Caffè",
        "Tè",
        "Liquori",
        "Distillati",
        "Grappe",
        "Aperitivi",
    ]


</script>


<Card.Root class="rounded-none flex flex-col w-full overflow-auto">
    <Card.Header>
        <h1 class="font-bold text-lg">Menù</h1>
    </Card.Header>
    <Card.Content class="flex flex-col">
        <section id="main-courses" class="p-2 rounded-sm">
            <Label>Primo piatto</Label>
                <div class="grid grid-cols-4 grid-rows-1 gap-2 text-secondary">
                    {#each [1,2,3,] as _}
                        <Card.Root>
                            <Card.Content class="object-contain bg-red p-2">
                                <img src="https://source.unsplash.com/random?pizza margherita/150x150" alt="margherita">
                            </Card.Content>
                        <Card.Footer>
                                <Label>Margherita</Label>
                        </Card.Footer>
                        </Card.Root>
                    {/each}
                </div> 
            </section>
        
        
       
    </Card.Content>
</Card.Root>