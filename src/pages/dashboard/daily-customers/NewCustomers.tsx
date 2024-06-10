import { theme } from 'antd';
import {
  BarElement,
  CategoryScale,
  Chart,
  ChartOptions,
  ChartType,
  Legend,
  LinearScale,
  Scale,
  ScriptableContext,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartUnit, DateFilter } from 'stores';
import { createGradientChart, getLabelChart } from 'utils/chart';

type Props = {
  data: ChartUnit[];
  height: number;
  filter: DateFilter | undefined;
};

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const DailyCustomerChart = ({ data, height, filter }: Props) => {
  const { token } = theme.useToken();

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
        backgroundColor: (context: ScriptableContext<ChartType>) => createGradientChart(context, token),
        borderColor: token.colorPrimaryActive,
      },
    ],
  };
  return <Bar options={options} data={dataTest} height={height} />;
};
