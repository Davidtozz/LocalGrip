<script lang="ts">
    // @ts-ignore
/*     import {VisXYContainer, VisLine, VisAxis} from '@unovis/svelte' */
    import * as Card from '$lib/components/ui/card'
    import  { type ChartData, type Point, type ChartOptions } from 'chart.js';
    import * as Select from '$lib/components/ui/select'
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
  import { onDestroy } from 'svelte';
  import Label from './ui/label/label.svelte';

  const data: ChartData<"line", (number | Point)[], unknown> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: '',
        fill: false,
        backgroundColor: 'rgba(225, 204,230, .3)',
        borderColor: 'rgb(205, 130, 158)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(205, 130,1 58)',
        pointBackgroundColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 5,
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

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      title: {
        display: false
      },
      legend: {
        display: false,
        
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Month'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value'
        }
      }
    },
    maintainAspectRatio: false
  }

  onDestroy(() => {
    ChartJS.unregister(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)
  })

  ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)
</script>

<!-- 
    @component
    Custom made wrapper around [svelte-chartjs](https://github.com/SauravKanchan/svelte-chartjs/blob/master/src/Line.svelte) Line chart component   
-->


<Card.Root class="max-h-full flex flex-col p-4">
  <Card.Header class="p-0 text-center flex flex-row justify-between items-center">
    <Label>Sales Performance</Label>
    <div class="m-0 p-0 border-box w-20">
      <Select.Root portal={null} >
        <Select.Trigger class="h-full text-xs focus:ring-transparent">
          <Select.Value placeholder="Period" class="outline-none"/>
        </Select.Trigger>
        <!-- TODO change chart data accordingly -->
        <Select.Content class="text-xs">
          <Select.Item value="today" class="text-xs text-center"><p>Today</p></Select.Item>
          <Select.Item value="week" class="text-xs">Week </Select.Item>
          <Select.Item value="month" class="text-xs">Month</Select.Item>
          <Select.Item value="year" class="text-xs ">Year </Select.Item>
        </Select.Content>
      </Select.Root>  
    </div>
  </Card.Header>
  <Card.Content class="p-0">
    <Line {data} {options} />
  </Card.Content>
</Card.Root>
