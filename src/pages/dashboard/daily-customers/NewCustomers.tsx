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
import { memo } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartUnit, FilterDateParams } from 'stores';
import { createGradientChart, getLabelChart } from 'utils/chart';

type Props = {
  data: ChartUnit[];
  height: number;
  filter: FilterDateParams;
};

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DailyCustomerChartMemo = ({ data, height, filter }: Props) => {
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

  const dataConfig = {
    labels: getLabelChart(data, filter.type),
    datasets: [
      {
        data: data.map(({ value }) => value),
        backgroundColor: (context: ScriptableContext<ChartType>) => createGradientChart(context, token),
        borderColor: token.colorPrimaryActive,
      },
    ],
  };

  return <Bar options={options} data={dataConfig} height={height} />;
};

export const DailyCustomerChart = memo(DailyCustomerChartMemo);
