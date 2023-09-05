import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true, // Make the chart responsive
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly Expenses',
      font: {
        color: 'white',
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'white',
      },
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'white',
      },
    },
  },
  elements: {
    bar: {
      backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue color for bars
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Visualization = (props) => {
  const { selectedYear } = props;
  const [expensesData, setExpensesData] = useState([]);
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Total Expenses',
        data: expensesData,
      },
    ],
  });

  const fetchMonthlyTotal = async (month) => {
    try {
      const response = await fetch(
        `https://expensetrackerbackend-tcjg.onrender.com/api/expenses/getnotes?month=${month}&year=${selectedYear}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        }
      );

      const data = await response.json();
      let total = 0;
      data.forEach((dm) => {
        total += dm.money;
      });
      return total;
    } catch (err) {
      console.error('Error fetching monthly total');
      return 0;
    }
  };

  const fetchYearlyData = async () => {
    const yearlyExpenses = await Promise.all(
      labels.map(async (month) => {
        const monthlyExp = await fetchMonthlyTotal(month);
        return monthlyExp;
      })
    );

    setExpensesData(yearlyExpenses);

    setData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: yearlyExpenses,
        },
      ],
    }));
  };

  useEffect(() => {
    fetchYearlyData();
    // eslint-disable-next-line
  }, [selectedYear]);

  return (
    <div className= "bg-gray-900 h-full p-10">
      <Bar options={options} data={data} />
    </div>
  );
};

export default Visualization;
