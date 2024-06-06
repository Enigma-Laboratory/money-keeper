import { BarElement, CategoryScale, Chart, Legend, LinearScale, ScriptableContext, Title, Tooltip } from 'chart.js';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';
import { ChartUnit } from 'stores/dashboard';

type Props = {
  data: ChartUnit[];
  height: number;
};

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const DailyOrderChart = ({ data, height }: Props) => {
  // const t = useTranslation();
  // const { mode } = useConfigProvider();

  const options = {
    scales: {},
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      bar: {
        borderRadius: 5,
        tension: 0.4,
      },
    },
  };

  const createGradient = (context: ScriptableContext<'bar'>) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
    gradient.addColorStop(1, '#ffffff');
    gradient.addColorStop(0, '#ffbc2b');
    return gradient;
  };

  const dataTest = {
    parsing: {
      yAxisKey: 'net',
    },
    labels: data.map(({ date }) => dayjs(date).format('dddd')),
    datasets: [
      {
        data: data.map(({ value }) => value),
        backgroundColor: createGradient,
        borderColor: '#ff9100',
      },
    ],
  };
  return <Bar options={options} data={dataTest} height={height} />;
};
