import { BarElement, CategoryScale, Chart, ChartOptions, Legend, LinearScale, Scale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartUnit, DateFilter } from 'stores';
import { CHART_COLOR } from 'utils';
import { createGradientChart, getLabelChart } from 'utils/chart';

type Props = {
  data: ChartUnit[];
  height: number;
  filter: DateFilter | undefined;
};

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const DailyCustomerChart = ({ data, height, filter }: Props) => {
  const options: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (this: Scale, tickValue: number | string) {
            return (tickValue as number) % 1 === 0 ? tickValue : undefined;
          },
        },
      },
    },
    plugins: { legend: { display: false } },
    elements: { bar: { borderRadius: 5 } },
  };

  const dataTest = {
    labels: getLabelChart(data, filter),
    datasets: [
      {
        data: data.map(({ value }) => value),
        backgroundColor: createGradientChart,
        borderColor: CHART_COLOR.border,
      },
    ],
  };
  return <Bar options={options} data={dataTest} height={height} />;
};
