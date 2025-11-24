import React from 'react';
import { Box } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: Array.from({ length: 50 }, (_, i) => i + 1), // Example labels
    datasets: [
      {
        label: 'Sample Data',
        data: [20, 30, 25, 40, 35, 30, 45, 50, 25, 30, 40, 35, 20, 25, 30, 45, 40, 30, 20, 50], // Sample data points
        borderColor: '#319795', // Chakra teal color
        backgroundColor: 'rgba(49, 151, 149, 0.2)', // Semi-transparent fill color
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: false, // Hide x-axis for a cleaner look
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
  };

  return (
    <Box bg="white" p={6} boxShadow="md" borderRadius="lg" maxW="lg" mx="auto">
      <Line data={data} options={options} />
    </Box>
  );
};

export default LineChart;
