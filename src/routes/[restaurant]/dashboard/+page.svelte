<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import * as Select from "$lib/components/ui/select";
  import { Label } from "$lib/components/ui/label";
  import { Bell } from "lucide-svelte";
  import type { ChartOptions, ChartData, Point } from "chart.js";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from "chart.js";
  import { Line } from "svelte-chartjs";
  import { onDestroy } from "svelte";

  onDestroy(() => {
    ChartJS.unregister(
      Title,
      Tooltip,
      Legend,
      LineElement,
      LinearScale,
      PointElement,
      CategoryScale,
    );
  });

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  );

  const chartData: ChartData<"line", (number | Point)[], unknown> = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "",
        fill: false,
        backgroundColor: "rgba(225, 204,230, .3)",
        borderColor: "rgb(205, 130, 158)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(205, 130,1 58)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  export const chartOptions: ChartOptions<"line" | "bar"> = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: true, //set to true to display x axis
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        display: true, //set to true to display y axis
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    maintainAspectRatio: false,
  };
</script>

<Card.Root
  class="h-dvh rounded-none flex-grow m-0 border-0 bg-primary-foreground flex flex-col">
  <Card.Header class="justify-between flex-row ">
    <h1 class="font-bold text-lg">Dashboard</h1>
    <Bell class="h-4" />
  </Card.Header>
  <Card.Content
    class="grid grid-cols-6 grid-rows-5 gap-2 h-full m-h-full overflow-auto">
    <!-- First card -->
    <div
      class="h-full flex flex-col p-4 col-span-3 row-span-3 bg-card rounded-md shadow">
      <div
        class="px-0 py-1 text-center flex flex-row justify-between items-center">
        <h1>Total Revenue</h1>
        <div class="m-0 p-0 border-box h-8 flex-shrink w-20">
          <Select.Root portal="{null}">
            <Select.Trigger class="h-full text-xs focus:ring-transparent p-2">
              <Select.Value placeholder="Period" class="outline-none" />
            </Select.Trigger>
            <Select.Content class="text-xs">
              <Select.Item value="today" class="text-xs text-center"
                ><p>Today</p></Select.Item>
              <Select.Item value="week" class="text-xs">Week</Select.Item>
              <Select.Item value="month" class="text-xs">Month</Select.Item>
              <Select.Item value="year" class="text-xs ">Year</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
      <Card.Content class="p-0 h-full">
        <Line data="{chartData}" options="{chartOptions}" />
      </Card.Content>
    </div>

    <!-- Second card -->
    <Card.Root class="col-span-3 row-span-3  flex flex-col">
      <Card.Header class="py-3 text-center ">
        <Label>Orders</Label>
      </Card.Header>

      <div class="h-full flex flex-col"></div>
    </Card.Root>

    <Card.Root class="col-span-2 row-span-2" />
    <Card.Root class="col-span-2 row-span-2 bg-secondary-foreground" />
    <Card.Root class="col-span-2 row-span-2 bg-secondary-foreground" />
  </Card.Content>
</Card.Root>
