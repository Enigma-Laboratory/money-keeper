import { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartUnit, DateFilter } from 'stores';
import { CHART_COLOR, abbreviateNumbers } from 'utils';
import { createGradientChart, getLabelChart } from 'utils/chart';

type Props = {
  data: ChartUnit[];
  height: number;
  filter: DateFilter | undefined;
};

export const DailyRevenueChart = ({ data, height, filter }: Props) => {
  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (this, val) {
            const { value, unit } = abbreviateNumbers(val as number);
            return `${value}${unit} đ`;
          },
        },
      },
    },
    plugins: { legend: { display: false } },
    elements: { line: { tension: 0.4 } },
    animation: { duration: 1000 },
  };

  const dataTest = {
    type: 'line',
    labels: getLabelChart(data, filter),
    datasets: [
      {
        data: data.map(({ value }) => value),
        fill: true,
        backgroundColor: createGradientChart,
        borderColor: CHART_COLOR.border,
        borderWidth: 1,
      },
    ],
  };

  return <Line options={options} data={dataTest} height={height} />;
};
