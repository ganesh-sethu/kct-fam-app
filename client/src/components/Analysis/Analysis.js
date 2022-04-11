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
import { Line ,Pie} from 'react-chartjs-2';

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

const pieData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    
    },
  ],
};



export default function App({departments}) {
    const exclude = "ADMIN ARCH_DEPT BUDGET HR PRINCIPAL"
    const labels = departments.filter(item => !exclude.includes(item.department)).map(item => item.department);
    const data = departments.filter(item => !exclude.includes(item.department)).map(item => item.budget_used)
  
    return (
      <div>
        <div style={{maxHeight:"80vh",maxWidth:"75vw"}}>
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
        <div style={{maxHeight:"40vh",maxWidth:"40vw"}}>
          <h3 style={{textAlign:"center"}}> Budget Available - Department wise</h3>
            <Pie data={{
              ...pieData
            }} />
        </div>
      </div>


    );
}
