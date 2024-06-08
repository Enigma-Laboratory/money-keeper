import { BarElement, CategoryScale, Chart, Legend, LinearScale, ScriptableContext, Title, Tooltip } from 'chart.js';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';
import { ChartUnit, DateFilter } from 'stores';

type Props = {
  data: ChartUnit[];
  height: number;
  filter: DateFilter | undefined;
};

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const DailyCustomerChart = ({ data, height, filter }: Props) => {
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

  const createGradient = (context: ScriptableContext<'bar'>) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
    gradient.addColorStop(1, '#ffffff');
    gradient.addColorStop(0, '#ffbc2b');
    return gradient;
  };

  const getLabels = (): string[] => {
    let format: string = '';
    switch (filter) {
      case 'lastWeek':
        format = 'dddd';
        break;
      case 'lastMonth':
        format = 'D-MMM';
        break;
      case 'custom':
        format = 'l';
        break;
      default:
        break;
    }
    return data.map(({ date }) => dayjs(date).format(format));
  };

  const dataTest = {
    labels: getLabels(),
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
