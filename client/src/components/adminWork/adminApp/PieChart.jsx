import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  const labels = data.map(item => item.label);
  const counts = data.map(item => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          // Add more colors if needed
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
