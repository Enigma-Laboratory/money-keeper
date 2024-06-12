import { GlobalToken } from 'antd';
import {
  BarElement,
  CategoryScale,
  Chart,
  ChartType,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  ScriptableContext,
  Title,
  Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';
import { ChartUnit, DateFilterType } from 'stores';

export const chartInit = () => {
  Chart.register(
    CategoryScale,
    LineElement,
    LineController,
    LinearScale,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  );
  /**
   * or use this:
   * import { Chart, registerables} from 'chart.js';
   * Chart.register(...registerables);
   */
};

export const getLabelChart = (data: ChartUnit[], filter: DateFilterType): string[] => {
  let format: string = '';
  switch (filter) {
    case 'lastWeek':
      format = 'ddd';
      break;
    case 'lastMonth':
      format = 'D-MMM';
      break;
    case 'custom':
      format = 'l';
      break;
    default:
      format = 'ddd';
      break;
  }
  if (data.length === 0)
    return Array.from({ length: 7 }, (_, i) =>
      dayjs()
        .subtract(6 - i, 'd')
        .format(format),
    );
  return data.map(({ date }) => dayjs(date).format(format));
};

export const createGradientChart = (context: ScriptableContext<ChartType>, token: GlobalToken) => {
  const ctx = context.chart.ctx;
  const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
  gradient.addColorStop(1, token.colorBgContainer);
  gradient.addColorStop(0, token.colorPrimary);
  return gradient;
};
