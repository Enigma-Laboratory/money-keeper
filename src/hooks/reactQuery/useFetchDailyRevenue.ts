import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DEFAULT_DASHBOARD_CHART_INIT, DashboardService, FilterDateParams } from 'stores';

const DASHBOARD_DAILY_REVENUE_KEY = ' dashboard-dailyRevenue';

export const useFetchDailyRevenue = (params: FilterDateParams) => {
  return useQuery({
    queryKey: [DASHBOARD_DAILY_REVENUE_KEY, dayjs(params.start).format('L'), dayjs(params.end).format('L')],
    queryFn: () => {
      try {
        return DashboardService.instance.fetchDailyRevenue({ start: params.start, end: params.end });
      } catch (e) {
        console.error(e);
        return DEFAULT_DASHBOARD_CHART_INIT;
      }
    },
  });
};
