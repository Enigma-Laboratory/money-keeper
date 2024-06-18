import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DEFAULT_DASHBOARD_CHART_INIT, DashboardService, FilterDateParams } from 'stores';

const DASHBOARD_DAILY_ORDER_KEY = ' dashboard-dailyOrder';

export const useFetchDailyOrder = (params: FilterDateParams) => {
  return useQuery({
    queryKey: [DASHBOARD_DAILY_ORDER_KEY, dayjs(params.start).format('L'), dayjs(params.end).format('L')],
    enabled: true,
    queryFn: () => {
      try {
        return DashboardService.instance.fetchDailyOrder({ start: params.start, end: params.end });
      } catch (e) {
        console.error(e);
        return DEFAULT_DASHBOARD_CHART_INIT;
      }
    },
  });
};
