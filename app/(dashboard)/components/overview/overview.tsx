// Import necessary modules and components
import { ChartData } from './chartData';
import LineChart from '@/components/ui/linechart';
import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor: string;
  borderWidth: number;
  lineTension: number;
  pointHoverBackgroundColor: string;
  bezierCurve: boolean;
  fill?: boolean; // Make 'fill' property optional
}

export default function Overview() {
  const chartRef = useRef<ChartJS | null>(null);

  // Function to calculate moving average
  const calculateMovingAverage = (data: any, windowSize: number) => {
    return data.map((item: any, index: number, array: any[]) => {
      const start = Math.max(0, index - windowSize + 1);
      const end = index + 1;
      const subset = array.slice(start, end);
      const sum = subset.reduce((acc: any, val: { revenue: any }) => acc + val.revenue, 0);
      return sum / subset.length;
    });
  };

  const movingAverageWindowSize = 3; // Adjust this value based on your preference

  // Calculate moving average data
  const movingAverageData = calculateMovingAverage(ChartData, movingAverageWindowSize);

  const [chartData, setChartData] = useState<{
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor: string;
    borderWidth: number;
    lineTension: number;
    pointHoverBackgroundColor: string;
    bezierCurve: boolean;
    fill?: boolean; // Make 'fill' property optional
  }[];
}>({
  labels: ChartData.map((data) => data.month),
  datasets: [
    {
      label: 'Moving Average',
      data: movingAverageData,
      borderColor: '#CAEE53',
      borderWidth: 2,
      lineTension: 0.3,
      pointHoverBackgroundColor: 'teal',
      bezierCurve: true,
      fill:false,
      
      
    },
    {
      label: 'Revenue',
      data: ChartData.map((data) => data.revenue),
      borderColor: '#889BB8',
      borderWidth: 2,
      lineTension: 0.3,
      pointHoverBackgroundColor: 'teal',
      bezierCurve: true,
      fill:true ,
      backgroundColor: '#3E5F74'
    },
    
  ],
});

  const updateChart = () => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      updateChart();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChartResize = (chart: ChartJS, newSize: { width: number; height: number }) => {
    console.log('Chart resized. New size:', newSize);
  };

  const config = {
    scales: {
      x: {
        type: 'category',
        title: {
          display: false,
          text: 'Months',
        },
        time: {
          unit: 'month',
        },
        grid: {
          display: false,
        },
        ticks: {
          color:'#E3E9E2'
        }
      },
      y: {
        display: false,
        title: {
          display: false,
          text: 'Revenue',
        },
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 200,
        },

      },
    },
    maintainAspectRatio: true,
    responsive: true,
    plugins:{
        legend: {
        display: false, 
        position: 'bottom', 
        align: 'center',
        labels: {
        color: 'black', 
        usePointStyle: true, 
        boxWidth: 5, 
        padding: 10,
        pointStyle: 'dash', 
      }
    },      
    },
  };

  return (
    <div className='flex justify-center items-center h-[85%] md:h-full'>
      <LineChart chartData={chartData} options={config} />
    </div>
  );
}
