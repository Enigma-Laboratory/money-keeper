import { ChartType, ScriptableContext } from 'chart.js';
import dayjs from 'dayjs';
import { AntdTokenService } from 'services';
import { ChartUnit, DateFilter } from 'stores';
import { CHART_COLOR } from './constants';

export const getLabelChart = (data: ChartUnit[], filter: DateFilter | undefined): string[] => {
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

export const createGradientChart = (context: ScriptableContext<ChartType>) => {
  const theme = AntdTokenService.instance.theme;
  const ctx = context.chart.ctx;
  const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
  gradient.addColorStop(1, theme.colorBgContainer);
  gradient.addColorStop(0, CHART_COLOR.background);
  return gradient;
};
