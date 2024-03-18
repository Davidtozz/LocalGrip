<script lang="ts">
    import {Chart, type ChartConfiguration, type ChartConfigurationCustomTypesPerDataset} from 'chart.js/auto'
    import { onDestroy, onMount } from 'svelte'

    let portfolio: HTMLCanvasElement;
    let myChart: Chart;

    const data = {
            labels: ['Expenses', 'Savings', 'Investments'],
            datasets: [
                {
                    label: 'My First Dataset',
                    data: [150, 50, 100],
                    backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
                    // hoverOffset: 4,
                    borderWidth: 0
                }
            ]
        };
    const config: ChartConfiguration | ChartConfigurationCustomTypesPerDataset = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    display: true,
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'My Personal Portfolio'
                }
            }
        }
    };

    onMount(()=> {
        const ctx = portfolio.getContext('2d');
        // Initialize chart using default config set
        myChart = new Chart(ctx!, config);
      })

      onDestroy(() => {
        myChart.destroy();
      })


</script>
<div class="h-36 flex items-center justify-center">
    <canvas bind:this={portfolio}/>
</div>