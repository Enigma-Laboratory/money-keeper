import { Line } from 'react-chartjs-2';

type Props = {
  data: {
    timeUnix: number;
    timeText: string;
    value: number;
    state: string;
  }[];
  height: number;
};

export const DailyRevenue = ({ data, height }: Props) => {
  // const t = useTranslation();
  // const { mode } = useConfigProvider();

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    animation: {
      duration: 1000,
    },
  };
  // eslint-disable-next-line
  const gradientFill = (context: any) => {
    console.log(context);
    const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, context.chart.height);
    gradient.addColorStop(1, '#ffffff');
    gradient.addColorStop(0.5, '#D3EBFF');
    gradient.addColorStop(0, '#D3EBFF');
    return gradient;
  };

  const dataTest = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: data.map(({ value }) => value),
        fill: true,
        backgroundColor: gradientFill,
        borderColor: '#1677FF',
        borderWidth: 2,
      },
    ],
  };

  return <Line options={options} data={dataTest} height={height} />;
};
