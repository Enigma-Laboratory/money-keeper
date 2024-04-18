import { useConfigProvider } from '../../../context';
import { useTranslation } from 'react-i18next';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
type Props = {
  data: {
    timeUnix: number;
    timeText: string;
    value: number;
    state: string;
  }[];
  height: number;
};

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const NewCustomers = ({ data, height }: Props) => {
  const t = useTranslation();
  const { mode } = useConfigProvider();

  const options = {
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

  const gradientFill = (context: any) => {
    const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, context.chart.height);
    gradient.addColorStop(1, '#ffffff');
    gradient.addColorStop(0.5, '#D3EBFF');
    gradient.addColorStop(0, '#1677FF');
    return gradient;
  };

  const dataTest = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: data.map(({ value }) => value),
        backgroundColor: gradientFill,
        borderColor: '#1624de',
      },
    ],
  };
  return <Bar options={options} data={dataTest} height={height} />;
};
