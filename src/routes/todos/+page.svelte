<script lang="ts">
    import type { PageData } from './$types';
    import * as Table from "$lib/components/ui/table"
    import TableBody from '$lib/components/ui/table/table-body.svelte';
    

    export let data: PageData;

</script>



<Table.Root>
    <Table.Caption>List of your todos.</Table.Caption>
    <Table.Header>
        <Table.Row>
            <Table.Cell>Id</Table.Cell>
            <Table.Cell>Title</Table.Cell>
            <Table.Cell>Completed</Table.Cell>
        </Table.Row>
    </Table.Header>
</Table.Root>

