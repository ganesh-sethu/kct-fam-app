import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Budget Used Dept Wise',
    },
  },
};


export default function App({departments}) {
    const exclude = "ADMIN ARCH_DEPT BUDGET HR PRINCIPAL"
    const labels = departments.filter(item => !exclude.includes(item.department)).map(item => item.department);
    const data = departments.filter(item => !exclude.includes(item.department)).map(item => item.budget_used)
  
    return (
        <div style={{maxHeight:"80vh",maxWidth:"75vw",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",margin:"auto"}}>
          <h3 style={{textAlign:"center"}}>Budget Used - Department wise</h3>
          <Line options={options} data={{
            labels,
            datasets:[
              {
                label: 'Budget',
                data: data,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },

             ]
            }} />
        </div>
    );
}
