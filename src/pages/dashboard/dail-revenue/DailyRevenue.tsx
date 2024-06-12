import { theme } from 'antd';
import { ChartOptions, ChartType, ScriptableContext } from 'chart.js';
import { memo } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartUnit, FilterDateParams } from 'stores';
import { abbreviateNumbers } from 'utils';
import { createGradientChart, getLabelChart } from 'utils/chart';

type Props = {
  data: ChartUnit[];
  height: number;
  filter: FilterDateParams;
};

const DailyRevenueChartMemo = ({ data, height, filter }: Props) => {
  const { token } = theme.useToken();

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

  const dataConfig = {
    type: 'line',
    labels: getLabelChart(data, filter.type),
    datasets: [
      {
        data: data.map(({ value }) => value),
        fill: true,
        backgroundColor: (context: ScriptableContext<ChartType>) => createGradientChart(context, token),
        borderColor: token.colorPrimaryActive,
        borderWidth: 1,
      },
    ],
  };

  return <Line options={options} data={dataConfig} height={height} />;
};

export const DailyRevenueChart = memo(DailyRevenueChartMemo);
