import { ScriptableContext } from 'chart.js';
import dayjs from 'dayjs';
import { Line } from 'react-chartjs-2';
import { ChartUnit } from 'stores/dashboard';
type Props = {
  data: ChartUnit[];
  height: number;
};

export const DailyRevenueChart = ({ data, height }: Props) => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: { legend: { display: false } },
    elements: { line: { tension: 0.4 } },
    animation: { duration: 1000 },
  };

  const createGradient = (context: ScriptableContext<'line'>) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
    gradient.addColorStop(1, '#ffffff');
    gradient.addColorStop(0, '#ffbc2b');
    return gradient;
  };

  const dataTest = {
    type: 'line',
    labels: data.map(({ date }) => dayjs(date).format('dddd')),
    datasets: [
      {
        data: data.map(({ value }) => value),
        fill: true,
        backgroundColor: createGradient,
        borderColor: '#ff9100',
        borderWidth: 2,
      },
    ],
  };

  return <Line options={options} data={dataTest} height={height} />;
};
