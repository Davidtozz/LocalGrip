<script lang="ts">
    // @ts-ignore
/*     import {VisXYContainer, VisLine, VisAxis} from '@unovis/svelte' */
    import * as Card from '$lib/components/ui/card'
    import type { ChartData, Point } from 'chart.js';
    import { Line } from 'svelte-chartjs'



    import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js';

  const data: ChartData<"line", (number | Point)[], unknown> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: true,
        backgroundColor: 'rgba(225, 204,230, .3)',
        borderColor: 'rgb(205, 130, 158)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(205, 130,1 58)',
        pointBackgroundColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(0, 0, 0)',
        pointHoverBorderColor: 'rgba(220, 220, 220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      }
    ],
  };

    
  ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)
</script>

<!-- 
    @component
    Custom made wrapper around [svelte-chartjs](https://github.com/SauravKanchan/svelte-chartjs/blob/master/src/Line.svelte) Line chart component   
 -->


<div class="justify-center items-center">
    <Card.Root class="p-2">
        <Card.Header class="text-center p-0">
            <h1 class="font-bold text-lg">Chart</h1>
        </Card.Header>

        <Card.Content class="p-0">
            <!-- @ts-ignore -->
            <Line {data} />
        </Card.Content>


        <!--         <VisXYContainer>
            <VisLine {data} 
            x={d => d.x} y={d => d.y}/>
            <VisAxis type="x"/>
            <VisAxis type="y"/>
        </VisXYContainer> -->
        <Card.Footer></Card.Footer>
    </Card.Root>    
</div>
