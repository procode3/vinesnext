import React from 'react'
import {Line} from "react-chartjs-2"

interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string; 
  borderColor: string;
  borderWidth: number;
  lineTension: number;
  pointHoverBackgroundColor: string;
  bezierCurve: boolean;
  fill?: boolean;
}

interface LineChartProps {
  chartData: {
    labels: string[];
    datasets: Dataset[];
  };
  options:any
}
export default function LineChart({chartData , options}: LineChartProps) {
 
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Line data={chartData} options={options}/>
    </div>
  )
}
