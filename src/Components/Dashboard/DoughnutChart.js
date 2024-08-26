import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    Plugin
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

// Custom plugin to display the total sum in the center
const totalCenterTextPlugin = {
    id: 'totalCenterTextPlugin',
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.restore();
      
      // Calculate font size based on the chart height
      const fontSize = (height / 200).toFixed(2);
      ctx.font = `bold ${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";
      
      // Calculate the sum of the dataset
      const sum = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
      const textSum = sum.toString();
      
      // Calculate the x and y coordinates for the sum text
      const textX = Math.round((180 - ctx.measureText(textSum).width) / 2);
      const textY = height / 2 - 10; // Adjust y position upwards a bit
      
      // Draw the sum text in the center
      ctx.fillText(textSum, textX, textY);
      
      // Set font for the "total" text and calculate its position
      ctx.font = `${(fontSize / 1.5).toFixed(2)}em sans-serif`; // Slightly smaller font for "total"
      const textTotal = "Total";
      const textTotalX = Math.round((180 - ctx.measureText(textTotal).width) / 2);
      const textTotalY = height / 2 + 10; // Position "Total" text below the sum
      
      // Draw the "total" text below the sum text
      ctx.fillText(textTotal, textTotalX, textTotalY);
      
      ctx.save();
    }
};
  

const DoughnutChart = ({data, title, colors}) => {
    const chartData = {
        labels : Object.keys(data),
        datasets : [
            {
                label : title,
                data : Object.values(data),
                backgroundColor: colors,
                hoverBackgroundColor: colors,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            align: 'center',
            labels: {
                boxWidth: 15, // Width of the colored box for each label
                boxHeight: 15,
                padding: 20, // Padding between the label text and the colored box
                usePointStyle: false, // Use point style instead of rectangular box (optional)
            }
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              }
            }
          },
          datalabels: {
            display: false,
          },
        },
        layout: {
            padding: {
              right: 0, // Adds padding between the chart and the legend on the right
            }
        },
        cutout: '65%', // Adjust the width of the doughnut here (0% - full circle, 100% - thin ring)
    };

    return <Doughnut data={chartData} options={options} plugins={[totalCenterTextPlugin]} width="300px" height="300px" />
};

export default DoughnutChart;